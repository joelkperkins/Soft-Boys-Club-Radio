import React, { useRef, useState } from 'react';

// components
import Radio from '../Radio/Radio.component';
import Cassette from '../Cassette/Cassette.component';
import Disco from '../Disco/Disco.component';

// libraries
import styled from 'styled-components';
import { motion } from "framer-motion"
import './Player.css';

const Player = ({ tracks, setDancing }) => {
  const constraintsRef = useRef(null);
  const [activeTrack, setActiveTrack] = useState(null);
  const [spinTheBall, setSpinTheBall] = useState(false);

  const Cassettes = (tracks && tracks.length) ? tracks.map((track, i) => {
    if (activeTrack === null || activeTrack.station !== track.station) {
      return (
        <Row tabIndex="0" key={`track#${i}`} >
          <Cassette id={`track-${i}`} tabindex="-1" index={i} track={track} constraintsRef={constraintsRef} activeTrack={activeTrack} setActiveTrack={setActiveTrack} />
        </Row>
      )
    } else {
      return (
        <Row key={`track#${i}`}></Row>
      )
    }
  }) : [];

  const DiscoBall = activeTrack === null ?  null :  <Disco spinTheBall={spinTheBall} />;

  return (
    <Container activeTrack={activeTrack}>
      <motion.div className="drag-area" ref={constraintsRef}>
        <Bottom activeTrack={activeTrack}>
          <Radio activeTrack={activeTrack} setActiveTrack={(e) => setActiveTrack(e)} setSpinTheBall={() => setSpinTheBall(!spinTheBall)} setDancing={() => setDancing()}/>
        </Bottom>
        <Top>
          {Cassettes}
        </Top>
      </motion.div>
      {DiscoBall}
      <Background activeTrack={activeTrack} spinTheBall={spinTheBall}/>
    </Container>
  )
};

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${props => props.activeTrack !== null  && 'rgb(0, 0, 0, .5)'};
  animation: ${props => props.spinTheBall === true  && 'reflect 4s forwards infinite'};
`

const Row = styled.div`
  position: relative;
  width: 15rem;
  margin: 0 auto;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  overflow: none;
  margin-bottom: 2rem;
`

const Bottom = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 98%;
  z-index: ${props => props.activeTrack && '100'};
  margin-bottom: 1.5rem;
`

const Top = styled.div`
  position: absolute;
  z-index: 10;
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  top: 0;
  left: 0;
  width: 100%;
`

export default Player;
