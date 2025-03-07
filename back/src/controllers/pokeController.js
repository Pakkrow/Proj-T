import pool from "../config/db.js";

export async function registerPoke(req, res) {
  const { pokemon, user_id } = req.body;
  if (!pokemon) {
    return res.status(400).json({ message: "Pas de pokémon renseigné." });
  }
  pool.query(
    "SELECT * FROM pokemon_owned WHERE owner_id = ?",
    [user_id],
    async (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Erreur interne", error });
      }
      pool.query(
        "INSERT INTO pokemon_owned (owner_id, pokemon_name, is_team) VALUES (?, ?, ?)",
        [user_id, JSON.stringify(pokemon).replace(/"/g, ''), results.length < 6 ? true : false],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Erreur lors de l'enregistrement du Pokémon en DB",
              error: err,
            });
          }
          console.log("Sent to DB");
          return res.status(201).json({
            message: "Pokémon enregistré avec succès dans la DB",
            poke_id: result.insertId,
          });
        }
      );
    }
  );
}

export async function getMyPoke(req, res) {
  const {user_id} = req.body;
  if (!user_id) {
    return res.status(400).json({ message: "Pas d'id d'utilisateur renseigné."});
  }
  console.log("user id == " + user_id);
  pool.query(
    "SELECT * FROM pokemon_owned WHERE owner_id = ?",
    [user_id],
    async (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Erreur interne", error});
      }
      return res.status(200).json({
        message: "list of your mons",
        data: results,
      })
    }
  )
}
