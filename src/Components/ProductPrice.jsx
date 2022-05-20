import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
class ProductPrice extends Component {
  render() {
    const { product } = this.props;
    return (
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        {product.prices.map(({ currency, amount }, index) => (
          <Price key={index}>
            {currency.label === this.props.label ? (
              <PriceInfo>
                <h4>{currency.symbol}</h4>
                <p>{amount}</p>
              </PriceInfo>
            ) : null}
          </Price>
        ))}
      </ProductInfo>
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.currencyReducer.selected,
});

export default connect(mapStateToProps, {})(ProductPrice);
const PriceInfo = styled.span`
  display: flex;
  gap: 0.4rem;
  margin-top: 8px;
  font-weight: 700;
`;

const ProductName = styled.h3`
  font-size: 20px;
  font-weight: 300;
  color: #1d1f22;
`;
const Price = styled.div``;
const ProductInfo = styled.div``;
