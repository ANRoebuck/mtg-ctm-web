import React, { useState } from 'react';
import { throttle } from 'throttle-debounce';
import './auto-suggest-search-bar.scss';
import { observer } from 'mobx-react';
import { pricesStore } from '../store/PricesStore';
import { getAutocompleteSuggestions, getPrices } from '../gateway/http';


const AutoSuggestSearchBar = observer(({ placeholderText = 'Type to search',
  throttleMillis = 1000, maxSuggestions = 5, label = null, children, }) => {

  const [searchTerm, setSearchTerm] = useState('');

  const defaultSuggestions = () => ({ capturedAt: new Date(), values:[] });
  const [suggestions, setSuggestions] = useState(defaultSuggestions());

  const getUpdatedSuggestions = async (term) => term.length > 2 ? getAutocompleteSuggestions(term) : [];

  const handleChange = async (event) => {
    const updatedSearchTerm = event.target.value;
    setSearchTerm(updatedSearchTerm);

    // this ensures only latest suggestions will be used in a case where async calls resolve out of sequence
    const capturedAt = new Date();
    getUpdatedSuggestions(updatedSearchTerm)
      .then(values => setSuggestions(prev => prev.capturedAt < capturedAt ? { capturedAt, values } : prev));
  };
  
  // const throttledUpdate = (term) => throttle(throttleMillis, upDateWithGuaranteedLatest(term));


  // // a separate useState and useEffect are combined here to emulate a conditional setState callback
  // // setState calls are asynchronous
  // // a callback is required to ensure that logic executed only after the state is updated
  // // react hooks setState methods do not accept a callback function as an argument
  // // useEffect using the searchTerm state would be called on every keystroke, so a separate piece of state is used
  // const [v, execute] = useState('');
  // useEffect(() => {
  //   if (v) {
  //     onSubmit(v);
  //     setSearchTerm('');
  //     setSuggestions(defaultSuggestions());
  //     execute('');
  //   }
  // }, [v]);

  const onSubmit = (toSearchFor) => {
    setSearchTerm('');
    setSuggestions(defaultSuggestions());
    pricesStore.clearResults();
    pricesStore.activeSellers.forEach((seller) => {
      getPrices(seller.name, toSearchFor).then((prices) => pricesStore.addPrices(prices))});
  }

  // const onSubmit = async (searchFor) => {
  //   if (clearOnSearch) setDiscoveredPrices([]);

  //   setLastSearched(searchFor);
  //   setSearchTerm('');

  //   // getMkmSummary(searchFor);

  //   sellers.forEach(seller => {
  //     seller.enabled && toggleSellerLoading(seller);
  //     setSellerKeyValue('name', seller.name, 'results', '');
  //     setSellerKeyValue('name', seller.name, 'inStock', '');
  //   });
  //   const enabledSellers = sellers.filter(s => s.enabled);
  //   enabledSellers.forEach(s => getSearchResultsForSeller(s, searchFor));
  // }


  const suggestionsToDisplay = () => searchTerm ?
    <ul>
      {suggestions.values.slice(0, maxSuggestions).map((suggestion, i) =>
        <li key={"suggestion-" + i} onClick={() => onSubmit(suggestion)}>{suggestion}</li>)}
    </ul>
    : null;

  return (
    <div className="auto-suggest-search-bar">
      <div className="input-container">
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(searchTerm); }}>
          <label>
            {label}
            <div className="auto-complete-input">
              <input type="text" value={searchTerm} placeholder={placeholderText} onChange={handleChange}/>
              {suggestionsToDisplay()}
            </div>
          </label>
        </form>
      </div>

      {children ?
        <div className="children">
          {children}
        </div>
        : null}

    </div>

  )
});

export default AutoSuggestSearchBar;
