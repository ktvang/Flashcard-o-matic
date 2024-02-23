import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function Study() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [cardNumber, setCardNumber] = useState(1);
    const [front, isFront] = useState(true);
    const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readDeck(deckId);
        setDeck(response);
        setCards(response.cards);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [deckId]);

  function nextCard(index, total) {
    if (index < total) {
      setCardNumber(cardNumber + 1);
    } else {
      const restart = window.confirm(
          `Restart cards? Click 'cancel' to return to the home page`
        );
      if (restart) {
          setCardNumber(1);
        } else {
          history.push("/");
        }
    }
    isFront(true);
  }

  function flipCard() {
    if (front) {
      isFront(false);
    } else {
      isFront(true);
    }
  }
  
  function showNextButton(cards, index) {
    if (front) {
      return null;
    } else {
      return (
        <button
          onClick={() => nextCard(index + 1, cards.length)}
          className="btn btn-primary mx-1"
          >
          Next
        </button>
      );
    }
  }

  function enoughCards() {
    return (
      <div className="card">
        {cards.map((card, index) => {
          if (index === cardNumber - 1) {
            return (
              <div className="card-body" key={card.id}>
                <div className="card-title">
                  {`Card ${index + 1} of ${cards.length}`}
                </div>
                <div className="card-text">
                  {front ? card.front : card.back}
                </div>
                <button
                  onClick={flipCard}
                  className="btn btn-secondary mx-1"
                  >
                  Flip
                </button>
                {showNextButton(cards, index)}
              </div>
            );
          }
        })}
      </div>
    );
  }

  function notEnoughCards() {
    return (
            <div>
              <h2>Not enough cards.</h2>
              <p>
                You need at least 3 cards to study. There are {cards.length}{" "}
                cards in this deck.
              </p>
              <Link
                to={`/decks/${deck.id}/cards/new`}
                className="btn btn-primary mx-1"
                >
                Add Cards
              </Link>
            </div>
           );
  }

  return (
    <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deckId}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active">Study</li>
      </ol>
      <div>
        <h2>{`${deck.name}: Study`}</h2>
        <div>
          {cards.length === 0
            ? notEnoughCards()
          : cards.length > 2
            ? enoughCards()
          : notEnoughCards()}
        </div>
      </div>
    </div>
  );
}

export default Study;