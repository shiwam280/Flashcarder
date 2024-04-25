import { API_URL } from "./config";

export async function deleteDecks(deckId: string) {
  await fetch(`${API_URL}/decks/${deckId}`, {
    method: "DELETE",
  });
}
