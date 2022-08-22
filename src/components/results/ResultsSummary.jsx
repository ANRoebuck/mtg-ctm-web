import React from 'react';

const ResultsSummary = ({ resultsFound, cheapest }) => {

  if (resultsFound === 0) return null;

  return (
    <div className="results-summary">
      <div className="results-summary-section">
        <div className="results-summary-bold">{`${resultsFound} results found`}</div>
      </div>
      {cheapest ?
        <div className="results-summary-section">
          <div className="results-summary-bold">{`Cheapest: ${cheapest.price_textRepresentation}`}</div>
          <div className="results-summary-light">{`(${cheapest.seller})`}</div>
        </div> : null }
    </div>
  )

}

export default ResultsSummary;
