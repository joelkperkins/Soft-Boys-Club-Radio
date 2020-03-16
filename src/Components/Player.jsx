import React from 'react';
import Track from './Track';
import styled from 'styled-components';

const Body = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  border-left: solid .3rem white;
`;

const Player = ({ tracks, email }) => {
  let tracksList;
  console.log(tracks);
  if (tracks && tracks.length) {
    tracksList = tracks.map((track, i) => <Track key={`track#${i}`} index={i} track={track} />)
  }
  else if (email) {
    console.info("nothing to play? email " +  email)
  }
  
  return (
    <Body>
      {tracksList}
    </Body>
  )
};

export default Player;
