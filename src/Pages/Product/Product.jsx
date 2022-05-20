import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchAllProducts } from "../../actions/CateActions";
import { getCartProducts } from "../../actions/cartActions.js";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSize: "",
      selectedColor: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  handleCart = (id) => {
    const cartProduct = this.props.products.find(
      (product) => product.id === id
    );

    cartProduct.size = this.state.selectedSize;
    cartProduct.color = this.state.selectedColor;
    this.props.getCartProducts(cartProduct);
  };

  render() {
    const id = window.location.href.split("/")[3];
    const products = this.props.products.filter((product) => product.id === id);
    const { selectedColor, selectedSize } = this.state;
    return (
      <Container>
        {products.map((product) => (
          <ProductInfo key={product.id}>
            <Left>
              {product.gallery
                .map((item) => (
                  <ImageInfo key={item}>
                    <Image src={item} />
                  </ImageInfo>
                ))
                .slice(0, 4)}
            </Left>
            <Middle>
              <img
                src={product.gallery[0]}
                style={{ width: "450px" }}
                alt={product.name}
              />
            </Middle>
            <Right>
              <Brand>{product.brand}</Brand>
              <Name>{product.name}</Name>
              <SizeContainer>
                <Heading>Size:</Heading>
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
                <Heading>Color:</Heading>
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
              {product.prices.map(({ currency, amount }, index) => (
                <Price key={index}>
                  {currency.label === this.props.label ? (
                    <PriceInfo>
                      <Heading>Price:</Heading>
                      <h4>
                        {currency.symbol} {amount}
                      </h4>
                    </PriceInfo>
                  ) : null}
                </Price>
              ))}
              <CartInfo>
                <CartButton onClick={() => this.handleCart(product.id)}>
                  Add to Cart
                </CartButton>
              </CartInfo>
              <Desc>{product.description}</Desc>
            </Right>
          </ProductInfo>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.categoryReducer.products,
  label: state.currencyReducer.selected,
});

export default connect(mapStateToProps, { fetchAllProducts, getCartProducts })(
  Product
);

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  padding: 40px 60px;
`;
const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 15px;
`;
const ImageInfo = styled.div`
  width: 150px;
  height: 150px;
  border: 1px solid #e4e4e4;
  object-fit: cover;
  overflow: hidden;
  margin-bottom: 20px;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const Middle = styled.div``;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 60px;
`;
const Brand = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1d1f22;
`;
const Name = styled.p`
  margin-top: 10px;
  font-size: 28px;
  font-weight: 400;
`;
const Price = styled.div``;
const PriceInfo = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-weight: 700;
`;
const SizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const Heading = styled.h3`
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 10px;
`;
const ProductSize = styled.div`
  display: flex;
  gap: 10px;
`;
const PSize = styled.p`
  width: 45px;
  height: 35px;
  padding: 3px;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
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
  gap: 10px;
`;
const PColor = styled.div`
  width: 35px;
  height: 35px;
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
const CartInfo = styled.div`
  margin-top: 20px;
`;
const CartButton = styled.h3`
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 65px;
  color: white;
  background-color: rgba(94, 206, 123, 1);
  transition: 0.3s all ease;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 206, 123, 1);
  }
`;
const Desc = styled.p`
  margin-top: 20px;
  font-size: 18px;
  font-weight: 500;
`;
