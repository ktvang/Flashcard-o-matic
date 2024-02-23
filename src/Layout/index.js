import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import NotFound from './NotFound';
import Home from '../decks/Home';
import Study from '../decks/Study';
import CreateDeck from '../decks/CreateDeck';
import Deck from '../decks/Deck';
import EditDeck from '../decks/EditDeck';
import AddCard from '../decks/AddCard';
import EditCard from '../decks/EditCard';

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/decks/new" component={CreateDeck} />
          <Route path="/decks/:deckId/study" component={Study} />
          <Route path="/decks/:deckId" exact component={Deck} />
          <Route path="/decks/:deckId/edit" component={EditDeck} />
          <Route path="/decks/:deckId/cards/new" component={AddCard} />
          <Route path="/decks/:deckId/cards/:cardId/edit" component={EditCard} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

export default Layout;