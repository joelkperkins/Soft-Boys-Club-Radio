import React from 'react';
import Track from './Track';
import styled from 'styled-components';

const Body = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Player = ({ tracks }) => {
  let tracksList;
  if (tracks && tracks.length) {
    tracksList = tracks.map((track, i) => <Track key={`track#${i}`} index={i} track={track} />)
  }
  
  return (
    <Body>
      {tracksList}
    </Body>
  )
};

export default Player;
