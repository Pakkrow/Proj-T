import { useState } from 'react';
import "./index.css";
import PokeCard from './PokeCard';

const Pokedex = () => {
  const [pokeList, setPokeList] = useState([]);
  const [pokeTeam, setPokeTeam] = useState([]);

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const fetchPoke = async () => {
    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=' + randomNumberInRange(0, 1282) + '&limit=1');
      const data = await res.json();
      const newPoke = data.results[0];
      setPokeList(prevList => [...prevList, newPoke]);
    } catch (error) {
      console.log("Il y a une erreur (oh non !!) : " + error.message);
    }
  };

  const fetchSixPoke = async () => {
    for (var i = 0; i != 50; i++) {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/?offset=' + randomNumberInRange(0, 1282) + '&limit=1');
        const data = await res.json();
        const newPoke = data.results[0];
        setPokeTeam(prevList => [...prevList, newPoke]);
      } catch (error) {
          console.log("Il y a une erreur (oh non !!) : " + error.message);
      }
    };
  }

  return (
    <div className="App">

      <h1>Pokemons :</h1>
      <ul className='pokeList'>
        {pokeList.map((pokemon, index) => (
          <PokeCard key={index} name={pokemon.name} lvl={0}/>
        ))}
      </ul>
      <button onClick={fetchPoke}>LOAD</button>
      <h1>Pokemons :</h1>
      <ul className='pokeTeamList'>
        {pokeTeam.map((pokemon, index) => (
          <PokeCard key={index} name={pokemon.name} lvl={50}/>
        ))}
      </ul>
      <button onClick={fetchSixPoke}>LOAD SIX</button>
    </div>
  );
}

export default Pokedex;