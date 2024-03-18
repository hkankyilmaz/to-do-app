import express, { urlencoded } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import userRoutes from "./routes/userRoutes";
import toDoRoutes from "./routes/todoRoutes";
import cors from "cors";

export const prisma = new PrismaClient();

export const app = express();

// listening the port
const server = app.listen(8080, () => {
  console.log("The Server Running  on the 8080 port...");
});

// regular middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

// routes

app.get("/", (req, res) => {
  res.send("Hello Software Testing");
});

app.use("/user", userRoutes);
app.use("/todo", toDoRoutes);
