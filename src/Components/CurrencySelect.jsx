import React, { Component } from "react";
import "./currencySelect.scss";
import Down from "../assets/down.png";
import Up from "../assets/up.png";
import { connect } from "react-redux";
import { fetchCurrencies, selectedCurr } from "../actions/currAction";

class CurrencySelect extends Component {
  componentDidMount() {
    this.props.fetchCurrencies();
  }

  handleCurrencies = (label) => {
    this.props.selectedCurr(label);
    this.props.setCurrSelected({ isCurrSelected: false });
  };

  render() {
    const { isCurrSelected, setCurrSelected } = this.props;
    return (
      <div className="currency">
        <div
          className="currency-btn"
          onClick={() => setCurrSelected({ isCurrSelected: !isCurrSelected })}
        >
          {!this.props.selected ? (
            <>
              $
              <img src={!isCurrSelected ? Down : Up} alt="up/down-arrow" />
            </>
          ) : (
            this.props.selected
          )}
        </div>
        {isCurrSelected && (
          <div className="currency-content">
            {this.props.currencies?.map((currency) => (
              <div
                className="currency-item"
                onClick={() => this.handleCurrencies(currency.label)}
                key={currency.label}
              >
                {currency.symbol} {currency.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.currencyReducer.currencies,
  selected: state.currencyReducer.selected,
});

export default connect(mapStateToProps, { fetchCurrencies, selectedCurr })(
  CurrencySelect
);
