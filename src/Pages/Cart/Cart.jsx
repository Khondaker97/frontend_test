import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { removeProducts, getCartProducts } from "../../actions/cartActions.js";
import CartProduct from "../../Components/CartProduct.jsx";

class Cart extends Component {
  render() {
    const { cartProducts } = this.props;
    const subTotal = cartProducts.map(({ product, quantity }) => {
      const value = product.prices.map(({ currency, amount }) => {
        if (currency.label === this.props.label) {
          return amount * quantity;
        }
        return 0;
      });
      return value;
    });
    //summation of each product's price array
    const sumOfPrices = (arr) => {
      let sum = 0;
      for (let index = 0; index < arr.length; index++) {
        sum += Array.isArray(arr[index]) ? sumOfPrices(arr[index]) : arr[index];
      }
      return sum;
    };
    const total = Number(sumOfPrices(subTotal));
    const tax = (total * 0.21).toFixed(2);
    const pay = total + Number(tax);

    return (
      <Container>
        <Header>Cart</Header>
        <Hr />
        <CartInfo>
          {cartProducts?.map(({ product, quantity }) => (
            <CartProduct product={product} quantity={quantity} />
          ))}
        </CartInfo>
        <SidebarFooter>
          <TotalValue>
            <Value>
              Tax(21%): <h3>$ {tax}</h3>
            </Value>
            {/* <Value>
              Quantity: <h3></h3>
            </Value> */}
            <Value>
              Total: <h3>$ {pay.toFixed(2)}</h3>
            </Value>
          </TotalValue>
        </SidebarFooter>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  cartProducts: state.cartReducer.carts,
  products: state.categoryReducer.products,
  label: state.currencyReducer.selected,
});
export default connect(mapStateToProps, { removeProducts, getCartProducts })(
  Cart
);

const Container = styled.div`
  margin-top: 60px;
  padding: 0px 60px;
`;

const Header = styled.h1`
  font-size: 28px;
  font-weight: 700;
  padding-top: 30px;
  margin-bottom: 20px;
`;

const CartInfo = styled.div``;
const SidebarFooter = styled.div`
  height: 40vh;
`;
const TotalValue = styled.div`
  display: flex;
  flex-direction: column;
`;
const Value = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const Hr = styled.hr`
  background-color: #e5e5e5;
  margin-bottom: 30px;
`;
