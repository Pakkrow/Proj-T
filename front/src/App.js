import './App.css';
import { useEffect, useState, React } from 'react';
import Pokedex from './components/MyMons/Pokedex.js';
import PokeCard from './components/MyMons/PokeCard.js';
import LoginPage from './components/LoginPage.js';

function App() {
  const [input, setInput] = useState("");
  const [pokeList, setPokeList] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  //const isMyTokenExpired = isExpired(token);

  useEffect(() => {
    const storedConnection = localStorage.getItem("isConnected");
    setIsConnected(storedConnection === "true");  
  });

  useEffect(() => {
    localStorage.setItem("isConnected", isConnected);
    console.log("IsConnected == " + localStorage.getItem("isConnected", isConnected))
  }, [isConnected]);
  useEffect(() => {
  }, [pokeList]);

  const displayMon = () => {
    setPokeList([...pokeList, <PokeCard key={input}  name={input}/>]);
    return <PokeCard key={input} name={input}/>
  }

  const connectedUserPage = () => {
    console.log("Hello ????????? " + isConnected);
    if (isConnected)
      return (
      <div className="unsetDiv">
        <Pokedex></Pokedex>
        <input value={input} onInput={e => setInput(e.target.value)}/>
        <button onClick={() => displayMon()}>GO</button>
        <ul className='pokeList'>{pokeList}</ul>
      </div>);
    return (<LoginPage/>)
  }

  return (
    <div className="App">
      {connectedUserPage()}
    </div>
  );
} 

export default App;
