import express, {json} from "express";
import cors from "cors";
import pkg from "pg";
import {formToJSON} from "axios";

const {Client} = pkg;

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
    .then(() => console.log("\nDEBUG: Connected to the database on port: ", client.port))
    .catch((err) => console.error("Connection error", err.stack));

app.get("/candlesstick", async (req, res) => {
    const ticker = req.query.ticker;
    const queryText = "SELECT time, open, close, low, high FROM candles WHERE ticker = $1 ORDER BY time";
    const queryValues = [ticker];
    try {
        const result = await client.query(queryText, queryValues);
        res.send(result.rows);
    } catch (err) {
        console.error("ERROR: in server.mjs: ", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/tickers", async (req, res) => {
    try {
        const result = await client.query("SELECT DISTINCT ticker FROM candles");
        res.send(result.rows);
    } catch (err) {
        console.error("ERROR: in server.mjs: ", err);
        res.status(500).send("Internal Server Error");
    }
})

app.get("/candlesstick-4hours", async (req, res) => {
    const ticker = req.query.ticker;
    const queryText = "SELECT time, open, close, low, high FROM candles4hour WHERE ticker = $1 ORDER BY time";
    const queryValues = [ticker];
    try {
        const result = await client.query(queryText, queryValues);
        res.send(result.rows);
    } catch (err) {
        console.error("ERROR: in server.mjs: ", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/fractals-from-db-4hours", async (req, res) => {
    const ticker = req.query.ticker;
    const queryText = "SELECT time, extreme, log_message FROM fractals4hour WHERE ticker = $1";
    const queryValues = [ticker];
    try {
        const fractalsData = await client.query(queryText, queryValues);
        res.send(fractalsData.rows);
    } catch (err) {
        console.error("ERROR: in server.mjs: ", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/fractals-from-db", async (req, res) => {
    const ticker = req.query.ticker;
    const queryText = "SELECT time, extreme, log_message FROM fractals WHERE ticker = $1 LIMIT 10";
    const queryValues = [ticker];
    try {
        const fractalsData = await client.query(queryText, queryValues);
        res.send(fractalsData.rows);
    } catch (err) {
        console.error("ERROR: in server.mjs: ", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/fvg-from-db", async (req, res) => {
    const ticker = req.query.ticker;
    const queryText = "SELECT time, end_time, fvg_high, fvg_low FROM fvg WHERE ticker = $1 LIMIT 5";
    const queryValues = [ticker];
    try {
        const fvgData = await client.query(queryText, queryValues);
        res.send(fvgData.rows);
    } catch (err) {
        console.error("ERROR: in server.mjs: ", err);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/fvg-from-db-4hours", async (req, res) => {
    const ticker = req.query.ticker;
    const queryText = "SELECT time, end_time, fvg_high, fvg_low FROM fvg4hour WHERE ticker = $1 LIMIT 5";
    const queryValues = [ticker];
    try {
        const fvgData = await client.query(queryText, queryValues);
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
