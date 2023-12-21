import React, { useState } from "react";
import NavBar from "./NavBar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Vending from "./Vending";
import Cart from "./Cart"; // Import the Cart component
import useLocalStorage from "./hooks";
import SnackDetails from "./SnackDetails";
import "./App.css";

function App() {
  const [cart, setCart] = useLocalStorage("cart", {});

  const addItem = (item) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };

      if (updatedCart.hasOwnProperty(item)) {
        updatedCart[item] += 1;
      } else {
        updatedCart[item] = 1;
      }
      console.log(updatedCart);
      return updatedCart;
    });
  };

  // Calculate the number of items in the cart
  const cartItemCount = Object.values(cart).reduce(
    (total, count) => total + count,
    0
  );
  console.log(cartItemCount);

  return (
    <div className="App">
      <header>
        <h1>Vending Machine</h1>
        <NavBar cartItemCount={cartItemCount} />
      </header>
      <Switch>
        <Route exact path="/">
          <Vending addItem={addItem} />
        </Route>
        <Route exact path="/cart">
          <Cart cartItems={cart} />
        </Route>
        <Route path="/snacks/:name">
          <SnackDetails />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
