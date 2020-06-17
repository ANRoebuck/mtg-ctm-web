import React, { useState } from "react";
import DecklistOptions from "./DecklistOptions";
import { sortBy, splitBy, viewBy } from "./enums";
import DeckView from './DeckView';

const Deck = ({ decklist, sideIn, sideOut, saveDeck, loadDeck, removeCard }) => {
  const [sortColumnsBy, setSortColumnsBy] = useState(sortBy.cmc);
  const [splitColumnsBy, setSplitColumnsBy] = useState(splitBy.none);
  const [viewDeckBy, setViewDeckBy] = useState(viewBy.images);

  return (
    <div className="deck">
      <DecklistOptions
        sortOptions={Object.keys(sortBy)} setSortBy={setSortColumnsBy}
        splitOptions={Object.keys(splitBy)} setSplitBy={setSplitColumnsBy}
        viewOptions={Object.keys(viewBy)} setViewBy={setViewDeckBy}
        saveDeck={saveDeck}
        loadDeck={loadDeck}
      />
      {/*<hr/>*/}
      <DeckView
        decklist={decklist}
        sortColumnsBy={sortColumnsBy} splitColumnsBy={splitColumnsBy} viewDeckBy={viewDeckBy}
        sideIn={sideIn} sideOut={sideOut}
        removeCard={removeCard}
      />
    </div>
  );
};

export default Deck;