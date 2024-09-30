require('dotenv').config();
const express = require('express')
const app = express()
const mysql = require('mysql2'); // MySQL library for database interaction
const port = 3000;
// const cors = require('cors');

app.use(express.json());
// app.use(cors());

// Configure the database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Test the database connection
db.connect((err) => {
  if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
  }
  console.log('Connected to database as id ' + db.threadId);
});

// listen to the server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
}) 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Question 1 goes here
// Retrieve all patients
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  
  db.query(query, (err, results) => {
      if (err) {
          res.status(500).send('Error retrieving patients');
          return;
      } else {
        // Display all the patients
        res.render('patients', {results: results});
      }
  });
});

// Question 2 goes here
// Retrieve all providers
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
  
  db.query(query, (err, results) => {
      if (err) {
          res.status(500).send('Error retrieving providers');
          return;
      } else {
        // Display all the providers
        res.render('providers', {results: results});
      }
  });
});

// Question 3 goes here

// Filter patients by first name
app.get('/patients_first_name', (req, res) => {
  const firstName = req.query.first_name;
  const query = 'SELECT first_name FROM patients';

  db.query(query, [firstName], (err, results) => {
      if (err) {
          res.status(500).send('Error filtering patients');
          return;
      } else {
        // Display the patients by their first names
        res.render('patients_first_name', {results: results});
      }
  });
});

// Question 4 goes here

// Retrieve providers by specialty
app.get('/provider_specialty', (req, res) => {
  const specialty = req.query.specialty;
  const query = 'SELECT provider_specialty FROM providers';

  db.query(query, [specialty], (err, results) => {
      if (err) {
          res.status(500).send('Error filtering providers');
          return;
      }else {
        // Display the providers by their specialty
        res.render('provider_specialty', {results: results});
      }
  });
});

