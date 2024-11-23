import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:5173',"*"], 
  credentials: true, 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));



//routes declaration
app.get('/', (req, res) => {
  res.send('Hi, World! Welcome to Hourly Host');
 
});
import authRouter from "./routes/user.routes.js";
app.use("/auth",authRouter)
import partnerRouter from "./routes/partner.routes.js";
app.use("/partner",partnerRouter)
export { app };
