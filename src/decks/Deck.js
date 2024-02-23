import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, deleteDeck, deleteCard } from '../utils/api';

function Deck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckResponse = await readDeck(deckId);
        setDeck(deckResponse);
        setCards(deckResponse.cards);
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };
    fetchData();
  }, [deckId]);

  const handleDeleteDeck = async () => {
    if (window.confirm("Delete this deck? You will not be able to recover it")) {
      try {
        await deleteDeck(deck.id);
        history.push("/");
      } catch (error) {
        console.error("Something went wrong", error);
      }
    }
  };

  const handleDeleteCard = async (card) => {
    if (window.confirm("Delete this card? You will not be able to recover it")) {
      try {
        await deleteCard(card.id);
        history.go(0);
      } catch (error) {
        console.error("Something went wrong", error);
      }
    }
  };

  const handleEditDeck = () => {
    history.push(`/decks/${deckId}/edit`);
  };

  const handleStudy = () => {
    history.push(`/decks/${deckId}/study`);
  };

  const handleAddCard = () => {
    history.push(`/decks/${deckId}/cards/new`);
  };

  const handleEditCard = (card) => {
    history.push(`/decks/${deckId}/cards/${card.id}/edit`);
  };

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item active">{deck.name}</li>
      </ol>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{deck.name}</h2>
          <p>{deck.description}</p>
          <button onClick={handleEditDeck} className="btn btn-secondary mx-1">
            Edit
          </button>
          <button onClick={handleStudy} className="btn btn-primary mx-1">
            Study
          </button>
          <button onClick={handleAddCard} className="btn btn-primary mx-1">
            Add Cards
          </button>
          <button onClick={handleDeleteDeck} className="btn btn-danger mx-1">
            Delete
          </button>
        </div>
      </div>
      <h1>Cards</h1>
      {cards.map((card) => (
        <div className="card-deck" key={card.id}>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">{card.front}</div>
                <div className="col">{card.back}</div>
              </div>
              <div className="container row">
                <button onClick={() => handleEditCard(card)} className="btn btn-secondary mx-1">
                  Edit
                </button>
                <button onClick={() => handleDeleteCard(card)} className="btn btn-danger mx-1">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deck;