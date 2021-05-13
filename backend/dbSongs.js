import mongoose from "mongoose";

const songSchema = mongoose.Schema({
    name: String,
    cover: String,
    artist: String,
    audio: String,
    color: Array,
    id: Number,
    active: Boolean
});

export default mongoose.model("songs", songSchema)