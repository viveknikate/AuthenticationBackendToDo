import mongoose from 'mongoose';

const taskSchema= new mongoose.Schema({
    title: {
        type:String,
        required: true,
    },
    description: {
        type:String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',                    // thing mentioned in model('User', schema)
        required: true,
    },
    CreatedAt:{
        type: Date,
        default: Date.now,
    }
})

export const Task = mongoose.model("Task", taskSchema);

