import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import bookRoute from "./route/book.route.js"
import cors from "cors";
import userRoute from "./route/user.route.js"
import path from "path";

const _dirname = path.resolve();


const app = express()
const corsOptions ={
  origin: "https://latifbookstore.up.railway.app",
  Credentials:true  
}
app.use(cors(corsOptions))
app.use(express.json())

dotenv.config()
const PORT = process.env.PORT || 4000

const DB_URI = process.env.MongoDBURI;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })  
  .then(() => console.log('MongoDB connected...'))  
  .catch(err => console.error('MongoDB connection error:', err));


// mongoose.connect(DB_URI);
// mongoose.connection.on("connected", () => console.log("MongoDB Connected"));
// mongoose.connection.on("error", (err) => console.log("MongoDB Error", err));

app.use("/book", bookRoute)
app.use("/user", userRoute)

app.use(express.static(path.join(_dirname, "/Frontend/dist")))
app.get("*", (_,res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist" , "index.html"))  // replace with your static HTML file
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})