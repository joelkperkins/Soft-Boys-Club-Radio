import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TrackInfo from './TrackInfo';
import Button from './Button';


const Row = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    overflow: none;
    border-bottom: .1rem dashed rgb(225, 225, 225, .3);
`;

const Audio = styled.audio`
  background-color: transparent;
`;

const Track = ({index, track }) => {
  const [playing, setPlaying] = useState(false);
  const [thisTrack, setThisTrack] = useState(null);

  useEffect(() => {
    if (thisTrack === null) {
      setThisTrack(document.getElementById(track.url));
    }
  }, [thisTrack, track.url]);

  const handleClick = () => {
    setPlaying(!playing);
    if(playing) {
      thisTrack.pause();
    } else {
      thisTrack.play();
    }
  }

  return ( 
    <Row key={`track-key-${index}`}>
      <Audio id={track.url} src={track.url} type={track.type}></Audio>
      <TrackInfo title={track.title} artist={track.artist} genre={track.genre} desc={track.desc} heardBy={track.heardBy} date={track.date} />
      <Button id={track.url} playing={playing} handleClick={() => handleClick()}/>
    </Row>
  )
}

export default Track;
