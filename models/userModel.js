import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    address: {
        type: String,
    },
    websiteLink: {
        type: String,
    },
    location: {
        type: String,
    },
    rating: {
        type: Number,
    },
    certificate: {
        type: String,
    },
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
  
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", userSchema)
export default User