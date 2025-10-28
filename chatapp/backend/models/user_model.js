import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default:""
    },
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: ""
    }
}, {timestamps: true}) // timestamps ture - it will automatically adds two fields "createat and updatedat"

const User = mongoose.model("User", userSchema)

export default User