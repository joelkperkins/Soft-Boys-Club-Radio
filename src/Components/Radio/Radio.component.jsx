import React, { useEffect, useState, useRef } from 'react';
import Cassette from '../Cassette/Cassette.component';
import styled from 'styled-components';
import { motion } from "framer-motion"
import { GiPlayButton, GiPauseButton } from 'react-icons/gi';
import { MdEject } from 'react-icons/md';
import axios from 'axios';

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
`;

const PlayActive = styled(Play)`
  background-color: #29A745;
  color: #1eff4f;
`;

const PlayInactive = styled(Play)`
  background-color:white;
  color: black;
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
`;

const PauseActive = styled(Pause)`
  background-color: #FFC107;
  color: #fff600;
`;

const PauseInactive = styled(Pause)`
  background-color: white;
  color: black;
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
`;

const EjectActive = styled(Eject)`
  background-color: #19A2B8;
  color: white;
`;

const EjectInactive = styled(Eject)`
  background-color: white;
  color: black;
`;

const Radio = ({activeTrack, setActiveTrack}) => {
  const [status, setStatus] = useState('EMPTY');
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [nowPlaying, setNowPlaying] = useState('<LOADING>');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (activeTrack) {
      //setNowPlaying(activeTrack.title); may be outdated by time of play
      setStatus('LOADED');
      setAudio(document.getElementById('audio'));
    } else {
      setStatus('EMPTY');
      setAudio(null);
    }
  }, [activeTrack])

  const statusBank = {
    EMPTY: 'Please Insert a Cassette!',
    PLAYING: `Now Playing: ${nowPlaying}`,
    LOADED: `Press Play?`
  }

  const controlAudio = (input) => {
    if (audio && input === 'play') {
      audio.play();
      setPlaying(true);
      setStatus("PLAYING");
    } else if (audio && input === 'pause') {
      audio.pause();
      setPlaying(false);
      setStatus("LOADED");
      //end the polling of new tracknames
      clearInterval(intervalRef.current);
    }
  }

  useEffect( 
    () => {
      const siteUrl = 'https://icecast.softboys.club:18000';

      const fetchData = async () => {
        //NEED ICECAST TRACK INDEX
        if (activeTrack) {
          const icecastIndex = activeTrack.id.slice(-1);

          const result = await axios.get(
            siteUrl + "/status-json.xsl"
          );

          //IF ONE SOURCE, ICESTATS HAS NO ARRAY
          if (Array.isArray(result.data.icestats.source)) {
            setNowPlaying(result.data.icestats.source[icecastIndex].title);
          } else {
            setNowPlaying(result.data.icestats.source.title);
          }
        }
      };
      if (playing) {
        //update on play, then every 10 seconds
        fetchData();
        const id = setInterval(
          () => {
            fetchData(); 
          }, 10000);
        //save interval for cleanup
        intervalRef.current = id;
      }
    }, [playing, activeTrack]
  );

  return (
    <RadioBody>
      <RadioButtons>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          {activeTrack && <PlayActive onClick={() => controlAudio('play')}><GiPlayButton size='2em'/></PlayActive>}
          {!activeTrack && <PlayInactive onClick={() => controlAudio('play')}><GiPlayButton size='2em'/></PlayInactive>}
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          {activeTrack && <PauseActive onClick={() => controlAudio('pause')}><GiPauseButton size='2em' /></PauseActive>}
          {!activeTrack && <PauseInactive onClick={() => controlAudio('pause')}><GiPauseButton size='2em' /></PauseInactive>}
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          {activeTrack && <EjectActive onClick={() => {
            controlAudio('pause');
            setActiveTrack(null)}
          }>
            < MdEject size='2em' />
          </EjectActive>}
          {!activeTrack && <EjectInactive onClick={() => {
            controlAudio('pause');
            setActiveTrack(null)}
          }>
            < MdEject size='2em' />
          </EjectInactive>}
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