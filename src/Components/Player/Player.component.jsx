import React, { useRef, useState } from 'react';

// components
import Radio from '../Radio/Radio.component';
import Cassette from '../Cassette/Cassette.component';

// libraries
import styled from 'styled-components';
import { motion } from "framer-motion"
import './Player.css';

const Player = ({ tracks }) => {
  const constraintsRef = useRef(null);
  const [activeTrack, setActiveTrack] = useState(null);

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

  return (
    <motion.div className="drag-area" ref={constraintsRef} sty>
      <Bottom activeTrack={activeTrack}>
        <Radio activeTrack={activeTrack} setActiveTrack={(e) => setActiveTrack(e)}/>
      </Bottom>
      <Top>
        {Cassettes}
      </Top>
    </motion.div>
  )
};

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
