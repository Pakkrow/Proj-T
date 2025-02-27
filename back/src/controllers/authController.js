import pool from "../config/db.js";
import bcrypt from "bcrypt";

export async function login(req, res) {
    const { login, password } = req.body;
    if (!login || !password) {
        return res.status(400).json({ message: "Nom de compte ou mot de passe manquant." });
    }
    pool.query("SELECT * FROM user_info WHERE login = ?", [login], async (error, results) => {
        if (error) {
            return res.status(500).json({ message: "Erreur interne", error });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: "Identifiants incorrects" });
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        return res.status(200).json({ message: "Connecté" });
    });
}

export async function register(req, res) {
    const { login, password, confirmPassword, mail } = req.body;
  
    if (!login || !password || !confirmPassword || !mail) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }
  
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
    }
  
    pool.query("SELECT * FROM user_info WHERE mail = ?", [mail], async (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Erreur interne", error });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: "Email déjà utilisé" });
      }
  
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        pool.query(
          "INSERT INTO user_info (login, mail, password) VALUES (?, ?, ?)",
          [login, mail, hashedPassword],
          (err, result) => {
            if (err) {
              return res.status(500).json({ message: "Erreur lors de l'enregistrement", error: err });
            }
            return res.status(201).json({ message: "Utilisateur enregistré avec succès", userId: result.insertId });
          }
        );
      } catch (hashError) {
        return res.status(500).json({ message: "Erreur lors du hash du mot de passe", error: hashError });
      }
    });
  }