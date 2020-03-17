import React, { useEffect, useState } from 'react';
import Cassette from '../Cassette/Cassette.component';
import styled from 'styled-components';
import { motion } from "framer-motion"
import { GiPlayButton, GiPauseButton } from 'react-icons/gi';
import { MdEject } from 'react-icons/md';

const RadioMain = styled.div`
  width: 17rem;
  height: 9rem;
  background: gray;
  margin-top: auto;
  border: outset .3rem darkgray;
  border-radius: 1rem;
  display: flex;
  justify-content: flex-start;
  padding: 1rem;
  overflow: hidden;
  align-self: flex-start;
`;

const RadioInsert = styled.div`
  width: 16rem;
  height: 100%;
  background: darkgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1rem;
`;

const Screen = styled.div`
  padding: 0rem .5rem;
  width: 75%;
  height: 4rem;
  background: lightgreen;
  margin-bottom: 1rem;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Press Start 2P', cursive;
  font-size: .5rem;
`;

const Insert = styled.div`
  width: 100%;
  height: 4rem;
  background: black;
  border-radius: .3rem;
  border-top: inset .5rem darkgray;
  border-left: inset .5rem darkgray;
  border-right: inset .5rem darkgray;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RadioButtons = styled.div`
  display: flex;
`;

const RadioBody = styled.div`
  order: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #545454;
  border-radius: 3.5rem 1rem 3.5rem 1rem;
  border: outset .3rem #2b2b2b;
  width: 21rem;
  align-self: flex-end;
`;

const Radio = ({activeTrack, setActiveTrack}) => {
  const [status, setStatus] = useState(0);
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);
  let nowPlaying = '<Song Name>';

  if (activeTrack) {
    nowPlaying = activeTrack.title;
  }

  useEffect(() => {
    if (activeTrack) {
      setStatus(1);
      setAudio(document.getElementById('audio'));
    } else {
      setStatus(0);
      setAudio(null);
    }
  }, [activeTrack])

  const statusBank = {
    0: 'Please Insert a Cassette!',
    1: `Now Playing: ${nowPlaying}`
  }

  const controlAudio = (input) => {
    if (audio && input === 'play') {
      audio.play();
      setPlaying(true);
    } else if (audio && input === 'pause') {
      audio.pause();
      setPlaying(false);
    }
  }

  const Play = styled.button`
  z-index: 1;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 2rem .5rem .5rem .5rem;
  border-bottom: outset .3rem lightgray;
  border-right: outset .3rem lightgray;
  transform: skew(-30deg, 0deg);
  height: 2rem;
  width 4rem;
  background-color: ${activeTrack ? '#29A745' : 'white'};
  color: ${activeTrack && playing ? '#1eff4f' : activeTrack ? 'white' : 'black'};
`;

const Pause = styled.button`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: .5rem;
  border-bottom: outset .3rem lightgray;
  border-right: outset .3rem lightgray;
  transform: skew(-30deg, 0deg);
  height: 2rem;
  width 4rem;
  background-color: ${activeTrack ? '#FFC107' : 'white'};
  color: ${activeTrack && !playing ? '#fff600' : activeTrack ? 'white' : 'black'};
`;

const Eject = styled.button`
  z-index: 1;  
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: .5rem;
  border-bottom: outset .3rem lightgray;
  border-right: outset .3rem lightgray;
  transform: skew(-30deg, 0deg);
  height: 2rem;
  width 8rem;
  background-color: ${activeTrack ? '#19A2B8' : 'white'};
  color: ${activeTrack ? 'white' : 'black'};
`;

  return (
    <RadioBody>
      <RadioButtons>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Play onClick={() => controlAudio('play')}><GiPlayButton size='2rem'/></Play>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Pause onClick={() => controlAudio('pause')}><GiPauseButton size='2rem' /></Pause>
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Eject onClick={() => setActiveTrack(null)}>< MdEject size='2rem' /></Eject>
        </motion.div>
      </RadioButtons>
      <RadioMain>
        <RadioInsert id="insert-here">
        <Screen>{statusBank[status]}</Screen>
          {activeTrack ? <Cassette track={activeTrack} reduced={true} /> : <Insert>------------------------------------</Insert>}
        </RadioInsert>
      </RadioMain>
      {activeTrack ? <audio id='audio' src={activeTrack.url} /> : <audio></audio> }
    </RadioBody>
  );
}

export default Radio;