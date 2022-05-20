import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import { getCartProducts } from "../actions/cartActions";
import ProductPrice from "./ProductPrice";

class CategoryItem extends Component {
  handleCart = (id) => {
    const cartProduct = this.props.products.filter(
      (product) => product.id === id
    )[0];

    this.props.getCartProducts(cartProduct);
  };
  render() {
    return (
      <Container>
        {this.props.products.map((product, index) => (
          <ItemContainer key={index}>
            <CartInfo>
              <CartButton onClick={() => this.handleCart(product.id)}>
                Add to Cart
              </CartButton>
            </CartInfo>
            <Link
              to={product.id}
              style={{ textDecoration: "none", color: "black" }}
            >
              {!product.inStock && (
                <StockBlur>
                  <h3
                    style={{
                      color: "#8D8F9A",
                      fontWeight: 300,
                      fontSize: "24px",
                    }}
                  >
                    Out of Stock
                  </h3>
                </StockBlur>
              )}
              <div>
                <Gallery src={product.gallery[0]} />
                <ProductPrice product={product} />
              </div>
            </Link>
          </ItemContainer>
        ))}
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.categoryReducer.filteredProducts,
});
export default connect(mapStateToProps, { getCartProducts })(CategoryItem);
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const ItemContainer = styled.div`
  width: 260px;
  height: 360px;
  padding: 10px;
  border: 1px solid #d4d3d3;
  border-radius: 5px;
  object-fit: cover;
  overflow: hidden;
  position: relative;
  &:hover {
    box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.1);
  }
`;
const StockBlur = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(199, 198, 198, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;
const CartInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 285px;
  display: flex;
  background-color: transparent;
  color: transparent;
  align-items: center;
  justify-content: center;
  z-index: 2;
  &:hover {
    background-color: rgba(240, 240, 240, 0.4);
    color: black;
  }
`;
const CartButton = styled.h3`
  font-size: 16px;
  font-weight: 300;
  padding: 5px;
  text-transform: uppercase;
  border: 1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    border: 1px solid #444444;
  }
`;
const Gallery = styled.img`
  width: 100%;
  height: 280px;
  border: 1px solid #eeeeee;
  border-radius: 5px;
  margin-bottom: 8px;
`;
