import React, { useState, useRef, useEffect } from 'react';
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
  const players = useRef({});
  const started = useRef(false);
  const [playing, setPlaying] = useState({id: null, next: null});

  useEffect(() => {
    tracks.forEach(t => {
      players.current[t.id] = document.getElementById(t.id);
    })
    setPlaying({id: null, next: 'play'});
  }, [players, tracks, started]);
  
  const handleClick = (id) => {
    console.log(playing)
    if (playing.next === 'play') {
      console.log(1, id)
      setPlaying({id: id, next: 'pause'});
      players.current[id].play();
    } else {
      console.log(2, id)
      setPlaying({id: id, next: 'play'});
      players.current[id].pause();
    }
  }
  
  const tracksList = tracks.map((t, i) => <Track key={`track#${i}`}index={i} t={t} playing={playing} handleClick={(e) => handleClick(e)} />);

  return (
    <Body>
      {tracksList}
    </Body>
  )
};

export default Player;
