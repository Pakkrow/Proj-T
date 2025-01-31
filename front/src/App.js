import logo from './logo.svg';
import './App.css';
import { useEffect, useState, React } from 'react';
import Pokedex from './components/Pokedex.js';
import PokeCard from './components/PokeCard.js';
import LoginPage from './components/LoginPage.js'

const isConnectedS = () => Boolean(localStorage.getItem("isConnected")) || 0;

function App() {
  const [input, setInput] = useState("");
  const [pokeList, setPokeList] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setIsConnected(isConnectedS);
  })

  useEffect(() => {

  }, [pokeList]);

  const displayMon = () => {
    setPokeList([...pokeList, <PokeCard key={input}  name={input}/>]);
    return <PokeCard key={input} name={input}/>
  }

  return (
    <div className="App">
      <LoginPage/>
      <div className="unsetDiv">
        <Pokedex></Pokedex>
        <input value={input} onInput={e => setInput(e.target.value)}/>
        <button onClick={() => displayMon()}>GO</button>
        <ul className='pokeList'>{pokeList}</ul>
      </div>
    </div>
  );
} 

export default App;
