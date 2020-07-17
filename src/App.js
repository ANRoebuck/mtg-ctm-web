import React from 'react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import DeckBuilder from "./DeckBuilder";
import Home from "./Home";
import ComparePrices from "./ComparePrices";

const App = () => {

  return (
    <Router>
      <div className="App">

          <ul className="menu">
            <li className="menu-item"><Link exact to={'/'}>Home</Link></li>
            <li className="menu-item"><Link to={'/deckBuilder'}>Deck Builder</Link></li>
            <li className="menu-item"><Link to={'/comparePrices'}>Compare Prices</Link></li>
          </ul>

          <hr/>

          <Route exact path='/' component={Home}/>
          <Route path='/deckBuilder' component={DeckBuilder}/>
          <Route path='/comparePrices' component={ComparePrices}/>

      </div>
    </Router>
  );
}

export default App;
