import { useEffect, useState } from "react";
import shinyLogo from "../assets/shiny_logo.png";
import "./PokeCard.css";
import types from "./types";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`width: 42px;`;

const SelectedPokeCard = ({ name }) => {
  const [pokeName, setPokeName] = useState();
  const [defFrontSprite, setDefFrontSprite] = useState();
  const [shinyFrontSprite, setShinyFrontSprite] = useState();
  const [isShiny, setIsShiny] = useState(false);
  const [baseStats, setBaseStats] = useState([]);
  const [stats, setStats] = useState([]);
  const [pokeTypes, setPokeTypes] = useState([]);
  const [typePath, setTypePath] = useState([]);
  const [lvlValue, setLvlValue] = useState(50);
  const [ivValue, setIvValue] = useState([0, 0, 0, 0, 0, 0]);
  const [evValue, setEvValue] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      if (name && lvlValue >= 0) {
        await getPokeURL({ name, lvlValue });
      }
    };
    fetchData();
  }, [name, lvlValue]);

  useEffect(() => {
    if (baseStats.length > 0) {
      setStats(baseStats.map((stat, index) => calculateStat(stat, index, lvlValue, ivValue[index], evValue[index])));
    }
  }, [baseStats, lvlValue, ivValue, evValue]);

  useEffect(() => {
    if (pokeTypes.length > 0) {
      getTypeUrls();
    }
  }, [pokeTypes]);

  async function getPokeURL(pokeName) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`);
      const data = await res.json();

      setPokeName(data.forms[0].name);
      setDefFrontSprite(data.sprites.front_default);
      setShinyFrontSprite(data.sprites.front_shiny);
      setBaseStats(data.stats);
      setPokeTypes(data.types);
    } catch (error) {
      console.log("Erreur lors de l'obtention des données Pokémon :", error);
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
  const handleSliderChange = (event, newValue) => {
    setLvlValue((newValue === 0) ? 1 : newValue);
  };

  const handleInputChange = (event) => {
    setLvlValue(event.target.value === "" ? 1 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (lvlValue < 1) {
      setLvlValue(1);
    } else if (lvlValue > 100) {
      setLvlValue(100);
    }
  };

  function calculateStat(stat, index, lvl, iv, ev) {
    let value;
    if (stat.stat.name === "hp") {
      value = Math.floor(((2 * stat.base_stat + iv + (ev / 4)) * lvl) / 100 + lvl + 10);
    } else {
      value = Math.floor(((2 * stat.base_stat + iv + (ev / 4)) * lvl) / 100 + 5);
    }
    return { ...stat, base_stat: value };
  }

  const handleIVChange = (index, newValue) => {
    const newIVs = [...ivValue];
    newIVs[index] = Math.min(Math.max(newValue, 0), 31);
    setIvValue(newIVs);
  };

  const handleEVChange = (index, newValue) => {
    const newEVs = [...evValue];
    newEVs[index] = Math.min(Math.max(newValue, 0), 252);
    setEvValue(newEVs);
  };

  return (
    <div className="selectedPokeCardCont">
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
      <button onClick={() => setIsShiny(!isShiny)} style={{ all: "unset" }}>
        <img
          className={isShiny ? "shinyLogoON" : "shinyLogoOFF"}
          src={shinyLogo}
          alt="Shiny Toggle"
        />
      </button>
      <section className="flexRow">
      <p>Lvl. </p>        
      <Input
          value={lvlValue}
          className="lvlInput"
          size="small"
          onChange={handleInputChange}
          onBlur={handleBlur}
          inputProps={{
            min: 1,
            max: 100,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
        </section>
      <Box sx={{ width: 250 }}>
          <Slider
            value={lvlValue}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
      </Box>
      <ul className="bsList">
        <p>Stats :</p>
        {stats.map((stat, index) => (
          <li key={index} className="bs">
            <p>{stat.stat.name.toUpperCase()}</p>
            <Input
              type="number"
              value={ivValue[index]}
              onChange={(e) => handleIVChange(index, Number(e.target.value))}
              inputProps={{ min: 0, max: 31 }}
            />
            <Input
              type="number"
              value={evValue[index]}
              onChange={(e) => handleEVChange(index, Number(e.target.value))}
              inputProps={{ min: 0, max: 252 }}
            />
            <p>{stat.base_stat}</p>
          </li>
        ))}
      </ul>
      <ul className="bsList">
        <p>Base stats : </p>
        {baseStats.map((stat, index) => (
          <li key={index} className="bs">
            <p>{stat.stat.name.toUpperCase()}</p>
            <p>{stat.base_stat}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedPokeCard;
