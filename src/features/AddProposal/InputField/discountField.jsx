import React from "react";
import "../../../styles/AddProposal/mainCalculator.css"; 

function SummaryTable({ data }) {
  const {
    clientPriceOriginal = "PHP 3,212,727",
    clientPriceDiscount = "PHP 2,891,454.3",
    clientPriceImpact = "-PHP 321,272.7",

    grossMarginOriginal = "28.6%",
    grossMarginDiscount = "20.6%",
    grossMarginImpact = "-7.9 pts",

    netProfitOriginal = "-3.4%",
    netProfitDiscount = "-11.4%",
    netProfitImpact = "-7.9 pts",

    bottomLineOriginal = "PHP -110,150.64",
    bottomLineDiscount = "PHP -328,616.076",
    bottomLineImpact = "-PHP 218,465.436",
  } = data || {};

  return (
    <div className="extra-section ">
      <h5 className="fw-bold">Summary</h5>
      <table className="summary-table fs-2">
        <thead className="fs-6" >
          <tr>
            <th>Metric</th>
            <th>Original</th>
            <th>After Discount</th>
            <th>Impact</th>
          </tr>
        </thead>
        <tbody className="fs-6">
          <tr>
            <td>Client Price</td>
            <td>{clientPriceOriginal}</td>
            <td>{clientPriceDiscount}</td>
            <td className="negative">{clientPriceImpact}</td>
          </tr>
          <tr>
            <td>Gross Margin</td>
            <td>{grossMarginOriginal}</td>
            <td>{grossMarginDiscount}</td>
            <td className="negative">{grossMarginImpact}</td>
          </tr>
          <tr>
            <td>Net Profit</td>
            <td>{netProfitOriginal}</td>
            <td>{netProfitDiscount}</td>
            <td className="negative">{netProfitImpact}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr className="bottom-line">
            <td>Bottom Line</td>
            <td>{bottomLineOriginal}</td>
            <td>{bottomLineDiscount}</td>
            <td className="negative">{bottomLineImpact}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default SummaryTable;
