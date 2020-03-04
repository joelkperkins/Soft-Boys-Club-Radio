import React from 'react'
import { FiPlay } from 'react-icons/fi'
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { MdPlayForWork } from 'react-icons/md'

const Icon = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Button = ({playing, handleClick, trackurl}) => {
  const m3u = trackurl + ".m3u";

  return <Icon>
    {(!playing) 
      ? <FiPlay color= "white" size="2rem" onClick={() => handleClick()}/> 
      : <Spinner name="line-scale-pulse-out" color="white" onClick={() => handleClick()}/>}

      <a href={m3u}>
        <MdPlayForWork color= "white" size="2rem"/> 
      </a>
    </Icon>
};

export default Button;
