import { useEffect, useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { deleteDecks } from "./api/deleteDecks";
import { TDeck, getDecks } from "./api/getDecks";
import { createDecks } from "./api/createDecks";

function App() {
  const [text, setText] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const deck = await createDecks(text);
    setDecks([...decks, deck]);
    setText("");
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDecks(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
    <div className="App">
      <div className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </div>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          id="deck-title"
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
          }}
        ></input>
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
