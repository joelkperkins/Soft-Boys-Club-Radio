import React from 'react';
import styled from 'styled-components';
import { MdMoreHoriz } from 'react-icons/md'

const Header = ({totalDonationAmount}) => {
  return (
    <Banner>
      <Letter>S</Letter>
      <Letter>O</Letter>
      <Letter>F</Letter>
      <Letter>T</Letter>
      <MdMoreHoriz color="white" size=".2em" />
      <Letter>B</Letter>
      <Letter>O</Letter>
      <Letter>Y</Letter>
      <Letter>S</Letter>
      <MdMoreHoriz color="white" size=".2em" />
      <Letter>C</Letter>
      <Letter>L</Letter>
      <Letter>U</Letter>
      <Letter>B</Letter>
      <RadioBox href="https://roico.zoom.us/j/95838147905?pwd=S3drbnN5eHI5aFpqc3c4RTdQeXV5dz09" target="_blank">
        <Radio>RADIO</Radio>
      </RadioBox>
    </Banner>
  )
};


const Banner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #f7f5f7;
  padding-left: .5rem;
`;

const Letter = styled.div`
  font-family: 'Arima Madurai', cursive;
  color: black;
  font-size: 1.7rem;
  font-weight: 800;
  background-color: #f7f5f7;
`;

const RadioBox = styled.a`
@media only screen and (orientation: portrait) {
    transform: rotate(-5deg);
    width: 20%;
    height: 3rem;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    border: .1rem solid pink;
    border-radius: .5rem;
    position: absolute;
    right: 0;
    top: 2rem;
    z-index: 3;
  }
  @media (min-width: 800px) {
    border-radius: .5rem;
    transform: rotate(-4deg);
    width: 20%;
    height: 4rem;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    border: .3rem solid pink;
    position: absolute;
    right: 0;
    top: 2rem;
    z-index: 3;
  }
`;

const Radio = styled.div`
  color: pink;
  padding: 0;
  margin: 0;
  font-family: 'Dosis', cursive;
  font-size: 1.8rem;
  @media (min-width: 800px) {
    font-size: 3rem;
  }
`;

const DonationBox = styled.div`
  width: 80%;
  background-color: #FCB142;
`

const Logo = styled.img`
  width: 5rem;
`

const Col = styled.div`
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  display: flex;
`

const Text = styled.div`
  font-family: 'Arima Madurai', cursive;
  color: black;
  font-size: 1rem;
  font-weight: 800;
  background-color: #f7f5f7;
`

const DollarAmount = styled.div`
  font-family: 'Arima Madurai', cursive;
  color: black;
  font-size: 2rem;
  font-weight: 800;
  background-color: #f7f5f7;
`

export default Header;
