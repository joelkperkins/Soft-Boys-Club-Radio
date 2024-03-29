import React, { useEffect, useState, useRef } from 'react';

// components
import Cassette from '../Cassette/Cassette.component';

// libraries
import styled from 'styled-components';
import { motion } from "framer-motion";
import { GiPlayButton, GiPauseButton } from 'react-icons/gi';
import { MdEject } from 'react-icons/md';
import axios from 'axios';

const Radio = ({activeTrack, setActiveTrack, setSpinTheBall, setDancing}) => {
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
  }, [activeTrack]);

  const statusBank = {
    EMPTY: 'Please load a tape!',
    PLAYING: `Now Playing: ${nowPlaying}`,
    LOADED: `Press Play?`
  };

  const controlAudio = (input) => {
    if (audio && input === 'play') {
      audio.play();
      setPlaying(true);
      setStatus("PLAYING");
      setSpinTheBall();
      setDancing();
    } else if (audio && input === 'pause') {
      audio.pause();
      setPlaying(false);
      setStatus("LOADED");
      //end the polling of new tracknames
      clearInterval(intervalRef.current);
      if (playing === true) {
        setSpinTheBall();
        setDancing();
      }
    }
  };

  useEffect( 
    () => {
      const fetchData = async () => {
        //NEED ICECAST TRACK INDEX
        if (activeTrack) {
          const icecastIndex = activeTrack.id.slice(-1);

          const result = await axios.get(
            process.env.REACT_APP_ICECAST_URL + "/status-json.xsl"
          );

          //IF ONE SOURCE, ICESTATS HAS NO ARRAY
          if (Array.isArray(result.data.icestats.source)) {
            setNowPlaying(result.data.icestats.source[icecastIndex].title);
          } else {
            if (result.data.icestats.source) {
              setNowPlaying(result.data.icestats.source.title);
            } else {
              setNowPlaying('We have no idea what is playing!');
            }
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
    <THEMEBODYGOTH id="radio-body">
      <RadioButtons id="radio-buttons">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} id="radio-button">
          {activeTrack && <PlayActive onClick={() => controlAudio('play')}><GiPlayButton size='2em'/></PlayActive>}
          {!activeTrack && <PlayInactive onClick={() => controlAudio('play')}><GiPlayButton size='2em'/></PlayInactive>}
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} id="radio-button">
          {activeTrack && <PauseActive  onClick={() => controlAudio('pause')}><GiPauseButton size='2em' /></PauseActive >}
          {!activeTrack && <PauseInactive onClick={() => controlAudio('pause')}><GiPauseButton size='2em' /></PauseInactive>}
        </motion.div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} id="radio-button">
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
      <THEMERADIOMAINGOTH id="radio-insert">
        <THEMERADIOINSERTGOTH id="insert-here">
          <THEMESCREENGOTH>{statusBank[status]}</THEMESCREENGOTH>
          {activeTrack ? <Cassette track={activeTrack} reduced={true} /> : <THEMEINSERTGOTH>------------------------------------</THEMEINSERTGOTH>}
        </THEMERADIOINSERTGOTH>
      </THEMERADIOMAINGOTH>
      {activeTrack ? <audio id='audio' src={activeTrack.url} /> : <audio></audio> }
    </THEMEBODYGOTH>
  );
}

const RadioMain = styled.div`
  width: 17rem;
  height: 9rem;
  background: gray;
  margin-top: auto;
  border: outset .4rem darkgray;
  border-radius: 1rem;
  display: flex;
  justify-content: flex-start;
  padding: 1rem;
  overflow: hidden;
  align-self: flex-start;
`;

const THEMERADIOMAINGOTH = styled(RadioMain)`
  background: #E0B650;
  border: outset .4rem #FFE186;
`;

const RadioInsert = styled.div`
  width: 16rem;
  height: 100%;
  background: darkgray;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: .5rem;
`;

const THEMERADIOINSERTGOTH = styled(RadioInsert)`
  background: #DEC38C;
`

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

const THEMESCREENGOTH = styled(Screen)`
  background: #1CB676;
  color: black;
`

const Insert = styled.div`
  width: 100%;
  height: 4rem;
  background: black;
  border-radius: .3rem;
  border-left: inset .5rem darkgray;
  border-bottom: inset .5rem darkgray;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const THEMEINSERTGOTH = styled(Insert)`
  border-left: inset .5rem #FFE186;
  border-bottom: inset .5rem #FFE186;
  color: white;
`

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

const THEMEBODYGOTH = styled(RadioBody)`
  background: #E0B650;
  border: outset .3rem #FFE186;
`

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
  width: 4rem;
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
  width: 4rem;
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
  width: 8rem;
`;

const EjectActive = styled(Eject)`
  background-color: #19A2B8;
  color: white;
`;

const EjectInactive = styled(Eject)`
  background-color: white;
  color: black;
`;


export default Radio;
