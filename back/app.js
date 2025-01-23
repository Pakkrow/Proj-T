const express = require('express');
const app = express();
const mysql = require("./src/init/database");
const cors = require('cors');
const { generateToken } = require('./jwtUtils');

const port = 5000;

console.log("Heya");
//mysql.getConnection();
app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// app.get('/', (req, res) => {
//   console.log("route slash fonctionnelle");
//   const token = generateToken(user);
//   try {
//     res.json({
//       success: true,
//       message: 'Authentication successful!',
//       token: token,
//     });
//   } catch {
//     res.status(401).json({
//       success: false,
//       message: 'Invalid username or password',
//     });
//   }
// });
