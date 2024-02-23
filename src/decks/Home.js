import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import { Link, useHistory } from "react-router-dom";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal)
      .then(setDecks)
      .catch(console.error);

    return () => abortController.abort();
  }, []);

  const handleDeleteDeck = async (deckId) => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      try {
        await deleteDeck(deckId);
        setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <h2>Decks</h2>
      <Link to="/decks/new">Create Deck</Link>

      {decks.map((deck) => (
        <div key={deck.id}>
          <h3>{deck.name}</h3>
          <p>{deck.description}</p>
          <p>{`${deck.cards.length} cards`}</p>

          <Link to={`/decks/${deck.id}/study`}>Study</Link>
          <Link to={`/decks/${deck.id}`}>View</Link>
          <button onClick={() => handleDeleteDeck(deck.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Home;