import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    }
})

userSchema.set('toJSON', {
    transform(doc, json){
        delete json.password
        return json
    }
})

const User = mongoose.model('User', userSchema)

export default User