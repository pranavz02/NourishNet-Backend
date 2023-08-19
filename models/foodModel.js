import mongoose from "mongoose"

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        require: true,
    },
    type: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    fromLocation: [{type: String}],
    toLocation: [{type: String}],
    isDelivered: {
        type: Boolean,
    },
    pickedUpBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    
},
{
    timestamps: true,
}
)

const Food = mongoose.model("Food", foodSchema)
export default Food