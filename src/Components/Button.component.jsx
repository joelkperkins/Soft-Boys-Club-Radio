import React from 'react'
import { FiPlay } from 'react-icons/fi'
import styled from 'styled-components';
import Spinner from 'react-spinkit';

const Button = ({playing, handleClick}) => {
  const Icon = styled.div`
    width: 15%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  `;
  return <Icon>
    {(!playing) 
      ? <FiPlay color= "white" size="2rem" onClick={() => handleClick()}/> 
      : <Spinner name="line-scale-pulse-out" color="white" onClick={() => handleClick()}/>}
    </Icon>
};

export default Button;
