import express from 'express'
import dotenv from 'dotenv'
import connectDb from"./config/dbconnect.js"
import cors from "cors"
import userRoutes from "./routes/authRoute.js"
import ngoRoutes from "./routes/ngoRoutes.js"
import horekaRoutes from "./routes/horekaRoutes.js"

dotenv.config()

connectDb()
const app = express();

const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/ngo', ngoRoutes)
app.use('/api/horeka', horekaRoutes)

app.get("/", (req, res)=> {
  res.send('API is running...')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})