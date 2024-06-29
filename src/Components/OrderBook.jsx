import React, { useState, useEffect } from "react";
import PriceChart from "./PriceChart";
import Widget from "../Molecules/Widget";
import Dropdown from "../Molecules/Dropdown";
import { STRINGS } from "../Strings/Strings";
import { SOCKET_ENDPOINT } from "../Constants/Constant";

// cryto order book component
const OrderBook = () => {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [price, setPrice] = useState([]);
  const [priceData, setPriceData] = useState([]);
  const [selectedPair, setSelectedPair] = useState("");

  // setting initial values
  useEffect(() => {
    setSelectedPair("BTC-USD");
  }, []);

  // handle currency on change
  const handlePairChange = (event) => {
    setSelectedPair(event.target.value);
  };

  // websocket integration
  useEffect(() => {
    let socket;
    setPriceData([]);
    setAsks([]);
    setBids([]);

    // web socket connection
    const connectWebSocket = () => {
      console.log("Connecting to WebSocket...");
      socket = new WebSocket(SOCKET_ENDPOINT);

      socket.onopen = () => {
        console.log("WebSocket connection opened");
        socket.send(
          JSON.stringify({
            type: "subscribe",
            product_ids: [selectedPair],
            channels: [
              "level2",
              "heartbeat",
              {
                name: "ticker",
                product_ids: [selectedPair],
              },
            ],
          })
        );
      };

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("WebSocket message received:", data);

        if (data.type === "snapshot" || data.type === "l2update") {
          const bids = data.bids.map(([price, size]) => ({
            price: parseFloat(price),
            size: parseFloat(size),
          }));
          const asks = data.asks.map(([price, size]) => ({
            price: parseFloat(price),
            size: parseFloat(size),
          }));
          setBids(bids);
          setAsks(asks);
        }

        if (data.type === "ticker") {
          setBids([
            { price: parseFloat(data.best_bid), size: data.best_bid_size },
          ]);
          setAsks([
            { price: parseFloat(data.best_ask), size: data.best_ask_size },
          ]);
          setPrice([{ price: parseFloat(data.price), size: data.last_size }]);
          setPriceData((prevData) => [
            ...prevData,
            {
              time: new Date(),
              price: parseFloat(data.price),
              bids: parseFloat(data.best_bid),
              asks: parseFloat(data.best_ask),
            },
          ]);
        }
      };

      socket.onerror = (error) => {
        console.error("WebSocket error", error);
      };

      socket.onclose = (event) => {
        console.log("WebSocket connection closed", event);
        if (event.wasClean) {
          console.log(
            `Connection closed cleanly, code=${event.code} reason=${event.reason}`
          );
        } else {
          console.log(`Connection died`);
          setTimeout(() => {
            console.log("Attempting to reconnect...");
            connectWebSocket();
          }, 5000); // Reconnect after 5 seconds
        }
      };
    };

    // Initialize WebSocket connection
    connectWebSocket();

    // Cleanup function to close WebSocket on component unmount
    return () => {
      console.log("Cleaning up WebSocket");
      if (socket) {
        socket.close();
      }
    };
  }, [selectedPair]);

  const widgetList = [
    {
      title: STRINGS.BIDS,
      price: "Bid Price",
      quantity: "Bid Size",
      list: bids,
    },
    {
      title: STRINGS.ASKS,
      price: "Ask Price",
      quantity: "Ask Size",
      list: asks,
    },
    {
      title: STRINGS.PRICE,
      price: "Price",
      quantity: "last Size",
      list: price,
    },
  ];

  return (
    <div>
      <div className="row py-2">
        <div className="col-sm-6 col-md-3">
          <Dropdown {...{ selectedPair, handlePairChange }} />
        </div>
        {widgetList.map((item) => (
          <div className="col-sm-6 col-md-3 d-flex justify-content-center">
            <Widget
              {...{
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                list: item.list,
              }}
            />
          </div>
        ))}
      </div>
      <PriceChart data={priceData} />
    </div>
  );
};

export default OrderBook;
