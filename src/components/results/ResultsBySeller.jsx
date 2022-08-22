import React from "react";

const ResultRow = ({ name, data }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{data.cards + " items"}</td>
      <td>{"Total: £" + data.totalPrice / 100}</td>
    </tr>
  );
}

const ResultsBySeller = ({ results = []  }) => {

  if (results.length === 0) return null;

  const summary = results.reduce((acc, ele) => {
    const { name, price } = ele;

    const updatedSummary = {
      ...acc,
    };

    if (!updatedSummary[name]) {
      updatedSummary[name] = { cards: 1, totalPrice: price.value };
    } else {
      const updatedEntry = {
        ...updatedSummary[name],
      };
      updatedEntry.cards += 1;
      updatedEntry.totalPrice += price.value;
      updatedSummary[name] = updatedEntry;
    }

    return updatedSummary;

  }, {});

  const toResultRow = ([k, v], i) => <ResultRow key={"result-" + i} name={k} data={v} />;

  const tableRows = () => Object.entries(summary).map((entry, i) => toResultRow(entry, i));

  return (
    <div className="table-container">
        <table>
          {tableRows()}
        </table>
    </div>
  );

}

export default ResultsBySeller;
