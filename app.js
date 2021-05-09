/* eslint-disable linebreak-style */
const express = require('express');
const path = require('path')

const app = express();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4040;

app.get('/', (req, res) => {
  res.render('home', {pageName:"Home Page"})
});

app.listen(PORT, () => console.log(`App started on port ${PORT}`));

module.exports = app;
