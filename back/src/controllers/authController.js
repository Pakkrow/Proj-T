import pool from "../config/db.js";
import bcrypt from "bcrypt";

export async function login(req, res) {
    const { login, password } = req.body;
    console.log("login == " + login);
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

        return res.status(200).json({ message: user.id });
    });
}

export async function register(req, res) {
    const { username, password, confirmPassword, mail } = req.body;
    console.log("hello = " + JSON.stringify(req.body));
    if (!username || !password || !confirmPassword || !mail) {
      console.log("hello1");
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }
  
    if (password !== confirmPassword) {
      console.log("hello2");
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas" });
    }
  
    pool.query("SELECT * FROM user_info WHERE mail = ?", [mail], async (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Erreur interne", error });
      }
      if (results.length > 0) {
        console.log("hello3");
        return res.status(400).json({ message: "Email déjà utilisé" });
      }
  
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        pool.query(
          "INSERT INTO user_info (login, mail, password) VALUES (?, ?, ?)",
          [username, mail, hashedPassword],
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