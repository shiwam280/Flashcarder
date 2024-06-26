import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Deck from "./models/Deck";
const app = express();
import { config } from "dotenv";
config();
const PORT = 5000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/decks", async (req: Request, res: Response) => {
  const decks = await Deck.find();
  res.json(decks);
});

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.delete("/decks/:deckId", async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const deck = await Deck.findByIdAndDelete(deckId);
  res.json(deck);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`server is listening on ${PORT}`);

  app.listen(PORT, () => {
    console.log(`server started`);
  });
});
