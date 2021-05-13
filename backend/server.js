import express from "express";
import mongoose from "mongoose";
import Cors from "cors";

import Songs from "./dbSongs.js";

// App Config
const app = express();
const port = process.env.PORT || 8001
const connection_url = "mongodb+srv://admin:Ld2daRgX3sWPpDu5@cluster0.mjba5.mongodb.net/codefidb?retryWrites=true&w=majority"

// Middlewares
app.use(express.json());
app.use(Cors());

// DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// API Endpoints (Ensure double quotes!!)
app.get("/", (req, res) => res.status(200).send("Gimme muh data!"));

app.post("/code-fi/songs", (req, res) => {
    const dbSong = req.body;

    Songs.create(dbSong, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    });
});

app.get("/code-fi/songs", (req, res) => {
    Songs.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    });
});

// Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));