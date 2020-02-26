import React from 'react'
import { FiPlay } from 'react-icons/fi'
import styled from 'styled-components';
import Spinner from 'react-spinkit';

const Button = ({playing, handleClick}) => {
  const Icon = styled.div`
    width: 15%;
    display: flex;
  `;
  return <Icon>
    {(!playing) 
      ? <FiPlay color= "white" size="2rem" onClick={() => handleClick()}/> 
      : <Spinner name="line-scale-pulse-out" color="white" onClick={() => handleClick()}/>}
    </Icon>
};

export default Button;
