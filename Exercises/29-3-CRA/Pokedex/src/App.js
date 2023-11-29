import "./App.css";
import pokemons from "./Pokemons.js";
import Pokegame from "./Pokegame";

function App() {
  return (
    <div className="App">
      <h1>PokeGame</h1>
      <Pokegame pokemons={pokemons} />
    </div>
  );
}

export default App;
