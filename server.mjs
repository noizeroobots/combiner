import express, { json } from "express";
import cors from "cors";
import pkg from "pg";
import { formToJSON } from "axios";

const { Client } = pkg;

const app = express();
app.use(cors());

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "trader-db",
  password: "12345",
  port: 5432,
});

client
  .connect()
  .then(() =>
    console.log(
      "\n--------------------\nDEBUG: Connected to the database on port: ",
      client.port
    )
  )
  .catch((err) => console.error("Connection error", err.stack));

app.get("/candlesstick", async (req, res) => {
  try {
    const result = await client.query(
      "SELECT time, open, close, low, high FROM candles"
    );
    //console.log('DEBUG.server.mjs_34: result: ', result.rows);
    res.send(result.rows);
  } catch (err) {
    console.error("ERROR: in server.mjs: ", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/fractals-from-db", async (req, res) => {
  try {
    const fractalsData = await client.query(
      "SELECT time, extreme, log_message FROM fractals"
      //"SELECT time, extreme, log_message FROM fractals WHERE id BETWEEN 55 AND 59"
    );
    //console.log('DEBUG.server.mjs_40: result: ', fractalsData.rows);
    res.send(fractalsData.rows);
  } catch (err) {
    console.error("ERROR: in server.mjs: ", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/fvg-from-db", async (req, res) => {
  try {
    const fvgData = await client.query(
      "SELECT time, fvg_high, fvg_low FROM fvg LIMIT 5"
      //"SELECT time, fvg_high, fvg_low FROM fvg LIMIT 25"
    );
    console.log('DEBUG.server.mjs_40: result: ', fvgData.rows);
    res.send(fvgData.rows);
  } catch (err) {
    console.error("ERROR: in server.mjs: ", err);
    res.status(500).send("Internal Server Error");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(
    `\n-------------------------------------------------------\nSERVER IS RUNNING ON PORT ${port}`
  );
});
