import { useState, useEffect, React } from "react";
import "../index.css";
import PokeCard from "./PokeCard";
import SelectedPokeCard from "./SelectedPokeCard";

const Pokedex = () => {
  const [pokeList, setPokeList] = useState([]);
  const [shinyList, setshinyList] = useState([]);
  const [pokeGroup, setPokeGroup] = useState([]);
  const [poke, setPoke] = useState([]);
  const [rand, setRand] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(
    Number(window.sessionStorage.getItem("selectedPokeIndex")) || -1
  );
  const [selectedPokeData, setSelectedPokeData] = useState(
    <p>No Pokémon selected, please select a Pokémon to get information.</p>
  );
  const [selectedPokeName, setSelectedPokeName] = useState(
    window.sessionStorage.getItem("selectedPokeName") || null
  );

  useEffect(() => {
    async function fetchData() {
      if (selectedPokeName === "null") {
        setSelectedPokeData(
          <p>
            No Pokémon selected, please select a Pokémon to get information.
          </p>
        );
        return;
      }

      const pokeInfo = await getPokeByName(selectedPokeName);
      setSelectedPokeData(<SelectedPokeCard name={selectedPokeName} is_shiny={(shinyList[Number(window.sessionStorage.getItem("selectedPokeIndex"))] === 1) ? true : false} />);
    }

    fetchData();
  }, [selectedPokeName]);

  useEffect(() => {
    getMyPoke();
    window.sessionStorage.setItem("selectedPokeIndex", -1);
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
      console.log("newpoke == " + JSON.stringify(pokeList[4]));
      setRand(randomNumberInRange(70, 79));
      setshinyList((prevList) => [...prevList, (rand === 77) ? 1 : 0]);      
      try {
        await registerPoke(newPoke.name, rand);
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
      const shinyPromises = data.data.map((poke) =>
        poke.is_shiny
      );
      const pokeData = await Promise.all(pokePromises);
      setPokeList(pokeData);
      setshinyList(shinyPromises)
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

  async function registerPoke(poke, is_shiny) {
    try {
      const res = await fetch("http://localhost:5000/registerPoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pokemon: poke,
          is_shiny: rand,
          user_id: sessionStorage.getItem("user_id"),
        }),
      });
    } catch (error) {
      console.log("Failed to send Hourly mon to back : " + error.message);
    }
  }

  const handleSelect = (index, name) => {
    if (selectedIndex === index) {
      setSelectedIndex(-1);
      window.sessionStorage.setItem("selectedPokeIndex", -1);
      window.sessionStorage.setItem("selectedPokeName", null);
      setSelectedPokeName("null");
    } else {
      setSelectedIndex(index);
      window.sessionStorage.setItem("selectedPokeIndex", index);
      window.sessionStorage.setItem("selectedPokeName", name);
      setSelectedPokeName(name);
    }
  };

  return (
    <div>
      <div className="DexBGImage" style={{ left: 0, right: 0, zIndex: 1 }} />
      <div className="flexCol DexContainer">
        <h1>Mes Pokémon :</h1>
        <button onClick={fetchHourlyPoke}>Get my pokémon</button>
        <ul className="monCont">
          <section className="fakeSelectedPoke"></section>
          <section className="selectedPoke">{selectedPokeData}</section>
          <ul className="pokeList">
            {pokeList.map((pokemon, index) => (
              <PokeCard
                key={index}
                name={pokemon.name}
                lvl={0}
                index={index}
                isSelected={selectedIndex === index}
                onSelect={() => handleSelect(index, pokemon.name)}
                is_shiny={(shinyList[index] === 1) ? true : false}
              />
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
};

export default Pokedex;
