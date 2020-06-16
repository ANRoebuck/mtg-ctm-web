import React, { useState } from 'react';
import './DeckBuilder.css';
import CardSearch from "./Components/CardSearch";
import Deck from "./Components/Deck";


const DeckBuilder = () => {
  const [decklist, setDecklist] = useState([]);

  const addCard = (card) => setDecklist((prevList) => [ ...prevList, { ...card, ms: 'm', index: prevList.length}]);

  const sideOut = (card) => setDecklist((prevList) => {
    const newList = [...prevList];
    const i = card.index;
    newList[i].ms = 's';
    return newList;
  });
  const sideIn = (card) => setDecklist((prevList) => {
    const newList = [...prevList];
    const i = card.index;
    newList[i].ms = 'm';
    return newList;
  });

  const saveDeck = () => localStorage.setItem('savedDeck', JSON.stringify(decklist));
  const loadDeck = () => setDecklist(JSON.parse(localStorage.getItem('savedDeck')));

  return (
    <div className="deck-builder">
      <Deck decklist={decklist} sideIn={sideIn} sideOut={sideOut} saveDeck={saveDeck} loadDeck={loadDeck}/>
      {/*<hr/>*/}
      <CardSearch addCard={addCard}/>
    </div>
  );
};

export default DeckBuilder;