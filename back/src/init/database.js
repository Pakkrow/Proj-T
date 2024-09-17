var mysql = require('mysql2');

module.exports = {
  getConnection: function () {
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "users" // Vous pouvez aussi directement spécifier la base de données ici
    });

    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");

      // Optionnel: vous pouvez ajouter des requêtes ici si nécessaire
    });

    return con; // Retourner la connexion pour l'utiliser ailleurs
  }
};
