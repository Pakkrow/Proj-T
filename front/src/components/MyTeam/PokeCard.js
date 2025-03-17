import { useEffect, useState } from "react";
import shinyLogo from "../../assets/shiny_logo.png";
import "./PokeCard.css";
import types from "../types";

const PokeCard = ({ name, lvl = 0, index, isSelected, onSelect }) => {
  const [pokeName, setPokeName] = useState();
  const [defFrontSprite, setDefFrontSprite] = useState();
  const [shinyFrontSprite, setShinyFrontSprite] = useState();
  const [isShiny, setIsShiny] = useState(false);
  const [baseStats, setBaseStats] = useState([]);
  const [pokeTypes, setPokeTypes] = useState([]);
  const [typePath, setTypePath] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (name && lvl >= 0) {
        await getPokeURL({ name, lvl });
      }
    };
    fetchData();
  }, [name, lvl]);

  useEffect(() => {
    if (pokeTypes.length > 0) {
      getTypeUrls();
    }
  }, [pokeTypes]);

  async function getPokeURL(params) {
    try {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" + params.name.toLowerCase()
      );
      const data = await res.json();

      setPokeName(data.forms[0].name);
      setDefFrontSprite(data.sprites.front_default);
      setShinyFrontSprite(data.sprites.front_shiny);

      if (params.lvl > 0) {
        setStatsForLvl(params.lvl, data.stats);
      } else {
        setBaseStats(data.stats);
        console.log("Base stats set without level adjustment.");
      }
      setPokeTypes(data.types);
    } catch (error) {
      console.log(
        "Il y a une erreur sur l'obtention de l'url du poke : ",
        error
      );
    }
  }

  const getTypeUrls = () => {
    const newTypePaths = pokeTypes
      .map((pokeType) => {
        const type = types.find((t) => t.type === pokeType.type.name);
        return type ? type.typePath : null;
      })
      .filter((typePath) => typePath !== null);
    setTypePath(newTypePaths);
  };

  function setStatsForLvl(lvl, stats) {
    const lvldStats = stats.map((stat) => {
      if (stat && stat.stat && stat.stat.name) {
        if (stat.stat.name === "hp") {
          stat.base_stat = Math.round(
            ((2 * stat.base_stat + 31) * lvl) / 100 + lvl + 10
          );
        } else {
          stat.base_stat = Math.round(
            ((2 * stat.base_stat + 31) * lvl) / 100 + 5
          );
        }
        return stat;
      } else {
        console.error("Stat is missing or malformed:", stat);
        return stat;
      }
    });
    setBaseStats(lvldStats);
  }

  const displaySecondType = () => {
    if (pokeTypes.length === 2)
      return <img className="types" src={typePath[1]} alt="Second Type" />;
    else
      return (
        <div
          style={{ height: "35.5px", marginTop: "5px", marginBottom: "5px" }}
        ></div>
      );
  };

  const displayLvl = () => {
    if (lvl > 0) return <p>Lvl. {lvl}</p>;
  };

  return (
    <div
      className={isSelected ? "selectedPokeCard" : "pokeCard"}
      onClick={() => onSelect(index)}
    >
      <p style={{ textTransform: "capitalize", textOverflow: "ellipsis" }}>
        {pokeName ? pokeName : "Not yet"}
      </p>
      <img
        className="mons"
        src={isShiny ? shinyFrontSprite : defFrontSprite}
        alt="Pokemon"
      />
      <img className="types" src={typePath[0]} alt="Type 1" />
      {displaySecondType()}
      <button
        onClick={(event) => {
          event.stopPropagation();
          setIsShiny(!isShiny);
        }}
        style={{ all: "unset" }}
      >
        <img
          className={isShiny ? "shinyLogoON" : "shinyLogoOFF"}
          src={shinyLogo}
          alt="Shiny Toggle"
        />
      </button>
    </div>
  );
};

export default PokeCard;
