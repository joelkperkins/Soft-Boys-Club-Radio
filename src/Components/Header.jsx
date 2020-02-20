import React from 'react';
import styled from 'styled-components';
import { MdMoreHoriz } from 'react-icons/md'

const Banner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #f7f5f7
`;

const Letter = styled.div`
  font-family: 'Arima Madurai', cursive;
  color: black;
  font-size: 2rem;
  font-weight: 800;
`;


const Header = () => {
  return (
    <Banner>
      <Letter>S</Letter>
      <Letter>O</Letter>
      <Letter>F</Letter>
      <Letter>T</Letter>
      <MdMoreHoriz color="white" size="1rem" />
      <Letter>B</Letter>
      <Letter>O</Letter>
      <Letter>Y</Letter>
      <Letter>S</Letter>
      <MdMoreHoriz color="white" size="1rem" />
      <Letter>C</Letter>
      <Letter>L</Letter>
      <Letter>U</Letter>
      <Letter>B</Letter>
    </Banner>
  )
};

export default Header;
