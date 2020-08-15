console.log("I am a scion of the Emperor's blood.")

const pgFormat = require('pg-format');
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});


client.connect();

const express = require('express')
var bodyParser = require("body-parser");
var cors = require('cors')
const app = express()
const port = process.env.PORT || 8080;
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('docs'))

app.post("/api/army", function (req, res){
  console.log('======= ARMY POST REQUEST =======');
  console.log(req)
  client.query('INSERT INTO army(name, description) VALUES($1, $2) RETURNING *', [req.body.name, req.body.description], (err, result) => {
    if(err) throw err;
    console.log(result)
    res.send(result.rows[0]);
    res.status(201).end();
  })
})

app.get("/api/army", function (req, res) {
  client.query('SELECT * FROM army', (err, result) => {
    console.log(result.rows)
    // res.send('The Emperor looks kindly upon you.');
    res.send(result.rows)
  })
})

app.get("/api/army/:id", function (req, res) {
  client.query('SELECT * FROM army WHERE id = $1', [req.params.id], (err, result) => {
    res.send(result.rows[0])
  })
})

app.post("/api/detachment", function (req, res){
  console.log(req.body)
  if(!req.body.detachment_type || req.body.command_points === undefined || !req.body.army_id || req.body.total_points === undefined){
    throw new Error("Invalid request. Must have detachment type, command points, army points, and army id.");
  }
  if(!req.body.name) {
    req.body.name = req.body.detachment_type;
  }
  client.query('INSERT INTO detachment(name, command_points, detachment_type, army_id, total_points) VALUES($1, $2, $3, $4, $5) returning id, name, command_points, total_points', [req.body.name, req.body.command_points, req.body.detachment_type, req.body.army_id, req.body.total_points], (err, result) => {
    if(err) throw err;
    console.log(result)
    res.send(result);

  })
})
app.delete("/api/detachment", function (req, res) {
  if(!req.query.id) {
    throw new Error("Invalid request. Must have detachment id.")
  } else {
    client.query('HOMEWORK', [req.query.id], (err, result) => {
      console.log(result.rows)
      res.send(result.rows)
    });
  }
})

app.get("/api/detachment", function (req, res) {
  console.log(req.query)
  if (req.query.army){
    client.query('SELECT * FROM detachment WHERE army_id = $1', [req.query.army], (err, result) => {
      console.log(result.rows)
      res.send(result.rows)
    });
  } else {
    client.query('SELECT * FROM detachment', (err, result) => {
      console.log(result.rows)
      res.send(result.rows)
    })
  };
})

client.query('DELETE FROM detachment WHERE id = $1', [req.query.id], (err, result) => {
res.send(result.rows[0])
})


app.get("/api/detachment/:id", function (req, res) {
  client.query('SELECT * FROM detachment WHERE id = $1', [req.params.id], (err, result) => {
    res.send(result.rows[0])
  })
})

app.post("/api/unit", function (req, res) {
  console.log(req.body)

  // Add multiple units at once
  if (req.body.units) {
    var unitsToAdd = [];
    req.body.units.forEach(function(unit) {
      unit.detachment_id = req.body.detachment_id;
      console.log(unit, "The Emperor's armies must be assembled in the most proper way.")
      if (!unit.point_value || !unit.model_id || !unit.detachment_id) {
        throw new Error("Invalid request. All units must have point value, model id, and detachment id.");
      }
      unitsToAdd.push([unit.point_value, unit.model_id, unit.detachment_id]);
    });

    var addMultipleUnitsQuery = pgFormat('INSERT INTO unit (point_value, model_id, detachment_id) VALUES %L', unitsToAdd);
    return client.query(addMultipleUnitsQuery, (err, result) => {
      if(err) throw err;
      console.log(result)
      res.send('OK');
    });

  // Only add one unit
  } else {
    if(!req.body.point_value || !req.body.model_id || !req.body.detachment_id){
      throw new Error("Invalid request. Must have point value, model id, and detachment id.");
    }

    return client.query('INSERT INTO unit(point_value, model_id, detachment_id) VALUES($1, $2, $3)', [req.body.point_value, req.body.model_id, req.body.detachment_id], (err, result) => {
      if(err) throw err;
      console.log(result)
      res.send('OK');
    })
  }
})

app.get("/api/unit", function (req, res) {
  console.log(req.query)
  if (req.query.detachment){
    client.query('SELECT * FROM unit WHERE detachment_id = $1', [req.query.detachment], (err, result) => {
      console.log(result.rows)
      res.send(result.rows)
    });
  } else {
    client.query('SELECT * FROM unit', (err, result) => {
      console.log(result.rows)
      res.send(result.rows)
    })
  };
})

app.get("/api/unit/:id", function (req, res) {
  client.query('SELECT * FROM unit WHERE id = $1', [req.params.id], (err, result) => {
    res.send(result.rows[0])
  })
})

app.get("/api/model", function (req, res) {
  client.query('SELECT * FROM model', (err, result) => {
    res.send(result.rows)
  })
})

app.listen(port, () => console.log(`${port}: You are a mere pawn in the games the Emperor of Mankind plays.`))
