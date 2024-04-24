import { useEffect, useState } from "react";
import "./App.css";

type TDeck = {
  title: string;
  _id: string;
};

function App() {
  const [text, setText] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({
        title: text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setText("");
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:5000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
    <div className="App">
      <div className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>{deck.title}</li>
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
