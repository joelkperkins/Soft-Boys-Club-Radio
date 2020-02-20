import React from 'react'
import { MdPlayCircleOutline, MdPauseCircleOutline } from 'react-icons/md'
import Spinner from 'react-spinkit';
import styled from 'styled-components'


const Icon = styled.div`
  position: inherit;
`;

const Button = ({id, playing}) => {
  console.log(id !== playing/id )
  return (playing.id !== id) 
    ? (
        <Icon>
          <MdPlayCircleOutline color= "rgb(254, 160, 72, .7)" size="7rem" />
        </Icon>
      )
    : (
        <Icon>
          <MdPauseCircleOutline color= "rgb(254, 160, 72, .7)" size="7rem" />
          <Spinner name="line-scale-pulse-out" color="orange"/>
        </Icon>
    );
};

export default Button;
