import React from "react";
import OrderBook from "./Components/OrderBook";
import "./index.css";
import "./Styles/dropdown.css";
import Header from "./Molecules/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <hr></hr>
        <div className="main-container">
          <OrderBook />
        </div>
      </main>
    </div>
  );
}

export default App;
