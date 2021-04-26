/* eslint-disable linebreak-style */
const express = require('express');

const app = express();
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4040;

app.get('/', (req, res) => {
  res.send("index.html");
});

app.listen(PORT, () => console.log(`App started on port ${PORT}`));

module.exports = app;
