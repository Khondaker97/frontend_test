import React, { Component } from "react";
import styled from "styled-components";
import Logo from "../assets/Logo.png";
import CurrencySelect from "./CurrencySelect";
import { NavLink } from "react-router-dom";
import MiniCart from "./MiniCart";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      isCurrSelected: false,
    };

    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (e) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
      this.setState({ isClicked: false });
    }
  };

  handleClicked = () => {
    this.setState({ isClicked: !this.state.isClicked });
  };

  render() {
    const { isClicked, isCurrSelected } = this.state;
    return (
      <Container>
        <Category>
          <LinkWrapper>
            <Link>WOMEN</Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link>MEN</Link>
          </LinkWrapper>
          <LinkWrapper>
            <Link>KIDS</Link>
          </LinkWrapper>
        </Category>
        <LogoWrapper>
          <NavLink to="/">
            <Icon src={Logo} />
          </NavLink>
        </LogoWrapper>
        <RightSide>
          <CurrencySelect
            isCurrSelected={isCurrSelected}
            setCurrSelected={(data) => this.setState(data)}
          />
          <div ref={this.wrapperRef}>
            <MiniCart isClicked={isClicked} setIsClicked={this.handleClicked} />
          </div>
          {isClicked && <OverLay />}
        </RightSide>
      </Container>
    );
  }
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 60px;
  padding: 0px 60px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

const Category = styled.div`
  font-size: 16px;
  display: flex;
`;
const LinkWrapper = styled.li`
  list-style: none;
  margin-right: 20px;
  cursor: pointer;
  transition: 0.4s all ease;
  position: relative;
  &:hover {
    color: #33eb33;
  }
  &:after {
    content: "";
    position: absolute;
    display: block;
    top: 150%;
    left: 0;
    background: transparent;
    width: 100%;
    height: 1px;
    transition: 0.5s all ease;
  }
  &:hover:after {
    background: #33eb33;
  }
`;
const Link = styled.a``;

const LogoWrapper = styled.div`
  cursor: pointer;
`;
const Icon = styled.img``;
const RightSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
`;
const OverLay = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 5;
`;
