import express from "express";
import registerRouter from "./routes/register.js";
import authRouter from "./routes/auth.js";
import contactsRouter from "./routes/contacts.js";
import connectDB from "./config/db.js";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/register", registerRouter);
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
