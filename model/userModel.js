import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: "user"},
});

export default mongoose.model("users", usersSchema);