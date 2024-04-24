import express, { Request, Response } from "express";
import mongoose from "mongoose";
import Deck from "./models/Deck";
const app = express();
import { config } from "dotenv";
config();
const PORT = 5000;

app.use(express.json());

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`server is listening on ${PORT}`);

  app.listen(PORT, () => {
    console.log(`server started`);
  });
});
