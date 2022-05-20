import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import { removeProducts, getCartProducts } from "../actions/cartActions";
import Cart from "../assets/Cart.png";
import { Link } from "react-router-dom";

class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSize: "",
      selectedColor: "",
    };
  }
  addItem = (id) => {
    const cartProduct = this.props.products.find(
      (product) => product.id === id
    );
    cartProduct.size = this.state.selectedSize;
    cartProduct.color = this.state.selectedColor;
    this.props.getCartProducts(cartProduct);
    console.log(cartProduct);
  };

  deleteItem = (id) => {
    this.props.removeProducts(id);
  };
  render() {
    const { isClicked, setIsClicked, cartProducts } = this.props;
    const { selectedColor, selectedSize } = this.state;
    //Getting the total value of each product
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
    const total = sumOfPrices(subTotal);
    return (
      <>
        <Wrapper onClick={setIsClicked}>
          <CartIcon src={Cart} />
          <Badge>{cartProducts.length}</Badge>
        </Wrapper>
        <CartSideBar className={isClicked ? "expand" : "shrink"}>
          {!cartProducts.length ? (
            <EmptyCart>Empty Cart</EmptyCart>
          ) : (
            <>
              <SidebarHeader>
                <Header>
                  My Bag,<Items>{cartProducts.length} items</Items>
                </Header>
              </SidebarHeader>
              <SidebarInfo>
                {cartProducts?.map(({ product, quantity }) => (
                  <ProductContainer key={product.id}>
                    <ProductInfo>
                      <Brand>{product.brand}</Brand>
                      <Name>{product.name}</Name>
                      {product.prices.map(({ currency, amount }, index) => (
                        <Price key={index}>
                          {currency.label === this.props.label ? (
                            <PriceInfo>
                              <h4>{currency.symbol}</h4>
                              <p>{(amount * quantity).toFixed(2)}</p>
                            </PriceInfo>
                          ) : null}
                        </Price>
                      ))}
                      <SizeContainer>
                        <p>Size:</p>
                        <ProductSize>
                          <PSize
                            onClick={() =>
                              this.setState({ selectedSize: "XS" })
                            }
                            className={selectedSize === "XS" ? "selected" : ""}
                          >
                            XS
                          </PSize>
                          <PSize
                            onClick={() => this.setState({ selectedSize: "S" })}
                            className={selectedSize === "S" ? "selected" : ""}
                          >
                            S
                          </PSize>
                          <PSize
                            onClick={() => this.setState({ selectedSize: "M" })}
                            className={selectedSize === "M" ? "selected" : ""}
                          >
                            M
                          </PSize>
                          <PSize
                            onClick={() => this.setState({ selectedSize: "L" })}
                            className={selectedSize === "L" ? "selected" : ""}
                          >
                            L
                          </PSize>
                        </ProductSize>
                      </SizeContainer>
                      <ColorContainer>
                        <p>Color:</p>
                        <ProductColor>
                          <PColor
                            onClick={() =>
                              this.setState({ selectedColor: "offwhite" })
                            }
                            className={
                              selectedColor === "offwhite" ? "selected" : ""
                            }
                          >
                            <Color
                              style={{ backgroundColor: "#D3D2D5" }}
                            ></Color>
                          </PColor>
                          <PColor
                            onClick={() =>
                              this.setState({ selectedColor: "black" })
                            }
                            className={
                              selectedColor === "black" ? "selected" : ""
                            }
                          >
                            <Color
                              style={{ backgroundColor: "#2B2B2B" }}
                            ></Color>
                          </PColor>
                          <PColor
                            onClick={() =>
                              this.setState({ selectedColor: "green" })
                            }
                            className={
                              selectedColor === "green" ? "selected" : ""
                            }
                          >
                            <Color
                              style={{ backgroundColor: "#0F6450" }}
                            ></Color>
                          </PColor>
                        </ProductColor>
                      </ColorContainer>
                    </ProductInfo>
                    <ProductQtn>
                      <Add onClick={() => this.addItem(product.id)}>+</Add>
                      <Quantity>{quantity}</Quantity>
                      <Remove onClick={() => this.deleteItem(product.id)}>
                        -
                      </Remove>
                    </ProductQtn>
                    <ProductImage>
                      <Image src={product.gallery[0]} />
                    </ProductImage>
                  </ProductContainer>
                ))}
              </SidebarInfo>
              <SidebarFooter>
                <TotalValue>
                  <h3>Total</h3>
                  <h3>$ {total.toFixed(2)}</h3>
                </TotalValue>
                <ViewCart>
                  <Link to="cart" style={{ textDecoration: "none" }}>
                    <Button primary onClick={setIsClicked}>
                      View Bag
                    </Button>
                  </Link>
                  <Link to="checkout" style={{ textDecoration: "none" }}>
                    <Button onClick={setIsClicked}>Check Out</Button>
                  </Link>
                </ViewCart>
              </SidebarFooter>
            </>
          )}
        </CartSideBar>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  cartProducts: state.cartReducer.carts,
  products: state.categoryReducer.products,
  label: state.currencyReducer.selected,
});
export default connect(mapStateToProps, {
  removeProducts,
  getCartProducts,
})(MiniCart);

const Wrapper = styled.div`
  display: block;
  margin: 0 5px;
  cursor: pointer;
  position: relative;
`;

const CartIcon = styled.img`
  cursor: pointer;
`;
const Badge = styled.small`
  position: absolute;
  top: -5px;
  right: -6px;
  width: 15px;
  height: 15px;
  color: white;
  background-color: #000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CartSideBar = styled.div`
  z-index: 10;
  width: 290px;
  background: #ffffff;
  top: 60px;
  right: 0;
  padding: 20px;
  position: fixed;
  height: 50vh;
  overflow: auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  transition: all ease-in-out 0.3s;
  &.expand {
    transition: all ease-in-out 0.3s;
    right: 40px;
  }
  &.shrink {
    transition: all ease-in-out 0.3s;
    right: -400px;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #d3d2d5;
    border-radius: 5px;
  }
`;

const EmptyCart = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
`;
const SidebarHeader = styled.div`
  margin-bottom: 20px;
`;
const Header = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 700;
`;
const Items = styled.span`
  font-weight: 400;
  padding-left: 3px;
`;
const SidebarInfo = styled.div`
  margin-bottom: 10px;
`;
const ProductContainer = styled.div`
  margin-bottom: 25px;
  display: flex;
  gap: 5px;
`;
const ProductInfo = styled.div`
  display: flex;
  width: 120px;
  flex-direction: column;
`;
const Price = styled.div``;
const PriceInfo = styled.span`
  display: flex;
  gap: 0.4rem;
  margin-top: 8px;
  font-weight: 700;
`;
const Brand = styled.h1`
  font-size: 15px;
  font-weight: 700;
  color: #1d1f22;
`;
const Name = styled.p``;
const SizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;
const ProductSize = styled.div`
  display: flex;
  gap: 3px;
  margin-top: 5px;
`;
const PSize = styled.p`
  width: 25px;
  padding: 3px;
  font-size: 11px;
  font-weight: 700;
  text-align: center;
  background-color: #fff;
  color: #000;
  border: 1px solid #1d1f22;
  cursor: pointer;
  &.selected {
    color: #fff;
    background-color: #000;
  }
`;
const ColorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 10px;
`;
const ProductColor = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
`;
const PColor = styled.div`
  width: 25px;
  height: 25px;
  padding: 2px;
  background-color: #fff;
  border: 1px solid transparent;
  cursor: pointer;
  &.selected {
    border: 1px solid #5ece7b;
  }
`;
const Color = styled.div`
  width: 100%;
  height: 100%;
`;

const ProductImage = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  width: 100%;
`;

const ProductQtn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Add = styled.h3`
  font-size: 18px;
  font-weight: 700;
  padding: 3px 8px;
  border: 1px solid black;
  cursor: pointer;
`;
const Remove = styled.h3`
  font-size: 18px;
  font-weight: 700;
  padding: 3px 10px;
  border: 1px solid black;
  cursor: pointer;
`;
const Quantity = styled.div``;
const SidebarFooter = styled.div`
  margin-top: 30px;
`;
const TotalValue = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ViewCart = styled.div``;

const Button = styled.button`
  display: inline-flex;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  border-radius: 3px;
  margin-right: 10px;
  margin-top: 10px;
  padding: 0.5rem 1.2rem;
  background: #5ece7b;
  color: white;
  border: 1px solid transparent;
  cursor: pointer;
  ${(props) =>
    props.primary &&
    css`
      background: white;
      color: black;
      border: 1px solid #0f0f0f;
    `}
`;
