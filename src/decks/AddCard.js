import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import FormCard from "./Form";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialState = { front: "", back: "" };

  const [newCard, setNewCard] = useState(initialState);
  const [deck, setDeck] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readDeck(deckId);
        setDeck(response);
      } catch (error) {
        console.error("Something went wrong", error);
      }
    };

    fetchData();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setNewCard({
      ...newCard,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createCard(deckId, { ...newCard });
    history.go(0);
    setNewCard(initialState);
    return response;
  };

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Add Card</li>
      </ol>
      <form onSubmit={handleSubmit}>
        <h2>{deck.name}: Add Card</h2>
        <div className="form-group">
          <label>Front</label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            onChange={handleChange}
            type="text"
            value={newCard.front}
          />
        </div>
        <div className="form-group">
          <label>Back</label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            onChange={handleChange}
            type="text"
            value={newCard.back}
          />
        </div>
        <button
          className="btn btn-secondary mx-1"
          onClick={handleDone}
        >
          Done
        </button>
        <button className="btn btn-primary mx-1" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;