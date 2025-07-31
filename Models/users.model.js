import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
    username: String,
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        select: false,
        required: true,
    },
    createdAt :{
        type: Date,
        default: Date.now,
    }
});
const User = mongoose.model('User', UserSchema);
export default User;