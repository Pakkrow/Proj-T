import { useState, useEffect, React } from "react";
import "./index.css";
import PokeCard from "./PokeCard";

const Pokedex = () => {
  const [pokeList, setPokeList] = useState([]);
  const [pokeGroup, setPokeGroup] = useState([]);
  const [poke, setPoke] = useState([]);

  useEffect(() => {
    getMyPoke();
    console.log("Connected : " + localStorage.getItem("isConnected"));
  }, []);

  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const fetchHourlyPoke = async () => {
    try {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?offset=" +
          randomNumberInRange(0, 1282) +
          "&limit=1"
      );
      const data = await res.json();
      const newPoke = data.results[0];

      setPoke(newPoke);
      setPokeList((prevList) => [...prevList, newPoke]);

      try {
        await registerPoke(newPoke.name);
      } catch (error) {
        console.log("Erreur lors de l'enregistrement du Pokémon :", error);
      }
    } catch (error) {
      console.log("Il y a une erreur (oh non !!) : " + error.message);
    }
  };

  const getMyPoke = async () => {
    try {
      const res = await fetch("http://localhost:5000/getMyPoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: sessionStorage.getItem("user_id"),
        }),
      });
      const data = await res.json();
      if (!data.data || data.data.length === 0) return;
      const pokePromises = data.data.map((poke) =>
        getPokeByName(poke.pokemon_name.replace(/"/g, ""))
      );
      const pokeData = await Promise.all(pokePromises);
      setPokeList(pokeData);
    } catch (error) {
      console.log("Failed to get my mons : " + error.message);
    }
  };

  async function getPokeByName(pokeName) {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokeName);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Il y a une erreur (oh non !!) : " + error.message);
      return null;
    }
  }

  async function registerPoke(poke) {
    try {
      const res = await fetch("http://localhost:5000/registerPoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pokemon: poke,
          user_id: sessionStorage.getItem("user_id"),
        }),
      });
    } catch (error) {
      console.log("Failed to send Hourly mon to back : " + error.message);
    }
  }

  return (
    <div>
      <div className="flexCol">
        <h1>Pokemons :</h1>
        <button onClick={fetchHourlyPoke}>Get my pokémon</button>
        <ul className="pokeList">
          {pokeList.map((pokemon, index) => (
            <PokeCard key={index} name={pokemon.name} lvl={0} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Pokedex;