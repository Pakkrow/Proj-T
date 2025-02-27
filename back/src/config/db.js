import mysql from "mysql";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "users",
  port: "3306",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Erreur de connexion à la base de données :", err);
  } else {
    console.log("Connexion à la base de données réussie !");
    connection.release();
  }
});

export default pool;
