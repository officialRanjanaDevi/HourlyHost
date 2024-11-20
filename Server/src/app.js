import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:5173'], 
  credentials: true, 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));



//routes declaration
app.get('/', (req, res) => {
  res.send('Hi, World! This is a simple route.');
 
});

export { app };
