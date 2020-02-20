import React from 'react';
import styled from 'styled-components'

const Body = styled.div`
  width: 55%;
  padding: 1rem;
  border-radius: 1rem;
  background-color: rgb(0, 0, 0, .5)
`;

const Item = styled.div`
  font-size: .8rem;
  font-family: 'Raleway', cursive;
  color: white;
`;

const TrackInfo = ({genre, title, date, heardBy}) => {

  return (
    <Body> 
      <Item>{`${title}`}</Item>
      <br />
      <Item>{`This ${genre} experience has been played by ${heardBy} individuals since ${date.slice(0, 16)}`}</Item>
    </Body>
  )
}

export default TrackInfo;
