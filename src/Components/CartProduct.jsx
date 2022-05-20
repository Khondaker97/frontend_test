import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { removeProducts, getCartProducts } from "../actions/cartActions.js";

class CartProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSize: "",
      selectedColor: "",
    };

    this.scrollRef = React.createRef();
  }
  scroll = (direction) => {
    const { current } = this.scrollRef;
    if (direction === "left") {
      current.scrollLeft -= 170;
    } else {
      current.scrollLeft += 170;
    }
  };

  addItem = (id) => {
    const cartProduct = this.props.products.find(
      (product) => product.id === id
    );

    this.props.getCartProducts(cartProduct);
  };

  deleteItem = (id) => {
    this.props.removeProducts(id);
  };

  render() {
    const { product, quantity } = this.props;
    const { selectedColor, selectedSize } = this.state;
    return (
      <ProductContainer>
        <Product>
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
                  onClick={() => this.setState({ selectedSize: "XS" })}
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
                  onClick={() => this.setState({ selectedColor: "offwhite" })}
                  className={selectedColor === "offwhite" ? "selected" : ""}
                >
                  <Color style={{ backgroundColor: "#D3D2D5" }}></Color>
                </PColor>
                <PColor
                  onClick={() => this.setState({ selectedColor: "black" })}
                  className={selectedColor === "black" ? "selected" : ""}
                >
                  <Color style={{ backgroundColor: "#2B2B2B" }}></Color>
                </PColor>
                <PColor
                  onClick={() => this.setState({ selectedColor: "green" })}
                  className={selectedColor === "green" ? "selected" : ""}
                >
                  <Color style={{ backgroundColor: "#0F6450" }}></Color>
                </PColor>
              </ProductColor>
            </ColorContainer>
          </ProductInfo>
          <Right>
            <ProductQtn>
              <Add onClick={() => this.addItem(product.id)}>+</Add>
              <Quantity>{quantity}</Quantity>
              <Remove onClick={() => this.deleteItem(product.id)}>-</Remove>
            </ProductQtn>
            <ProductImage>
              <ImageContainer ref={this.scrollRef}>
                {product.gallery.map((item, index) => (
                  <ImageCard key={index + 1}>
                    <Image src={item} alt="cart images" />
                  </ImageCard>
                ))}
              </ImageContainer>
              <ImageArrow>
                <Arrow onClick={() => this.scroll("left")}>&larr;</Arrow>
                <Arrow onClick={() => this.scroll("right")}>&rarr;</Arrow>
              </ImageArrow>
            </ProductImage>
          </Right>
        </Product>
        <Hr />
      </ProductContainer>
    );
  }
}
const mapStateToProps = (state) => ({
  products: state.categoryReducer.products,
  label: state.currencyReducer.selected,
});
export default connect(mapStateToProps, { removeProducts, getCartProducts })(
  CartProduct
);
const ProductContainer = styled.div``;
const Product = styled.div`
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;
const ProductInfo = styled.div`
  display: flex;
  width: 120px;
  flex-direction: column;
`;
const Brand = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #1d1f22;
`;
const Name = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;
const Price = styled.div``;
const PriceInfo = styled.span`
  display: flex;
  gap: 0.4rem;
  margin-top: 8px;
  font-weight: 700;
`;
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

const Right = styled.div`
  display: flex;
`;
const ProductImage = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
  max-width: 151px;
  position: relative;
`;
const ImageContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ImageCard = styled.div`
  min-width: 150px;
  margin-right: 20px;
  &:last-child {
    margin-right: 0px;
  }
`;
const Image = styled.img`
  width: 100%;
  object-fit: cover;
  transition: 0.5s all ease;
`;

const ImageArrow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  position: absolute;
  bottom: 10px;
  right: -20px;
`;

const Arrow = styled.div`
  cursor: pointer;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  padding: 3px 5px;
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
const Hr = styled.hr`
  background-color: #e5e5e5;
  margin-bottom: 30px;
`;
