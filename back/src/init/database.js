var mysql = require('mysql2');

module.exports = {
  getConnection: function () {
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "root",
      database: "users"
    });

    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });

    return con;
  }
};