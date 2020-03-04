import React from 'react';
import styled from 'styled-components'

const Body = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-evenly;
`;

const Genre = styled.div`
  font-size: .8rem;
  font-family: 'Raleway', cursive;
  color: white;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-family: 'Oswald', cursive;
  color: white;
`;

const TrackInfo = ({genre, title, station, date, heardBy}) => {

  return (
    <Body> 
      <Title>{`${title}`}</Title>
      <Genre>{`*${genre}`}</Genre>
    </Body>
  )
}

export default TrackInfo;
