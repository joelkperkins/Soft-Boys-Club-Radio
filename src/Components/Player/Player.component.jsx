import React, { useEffect, useRef, useState } from 'react';
import Radio from '../Radio/Radio.component';
import Cassette from '../Cassette/Cassette.component';
import styled from 'styled-components';
import { motion } from "framer-motion"
import './Player.css';




const Player = ({ tracks }) => {
  const constraintsRef = useRef(null);
  const [activeTrack, setActiveTrack] = useState(null);

  const Row = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    overflow: none;

    :focus {
      z-index: 3;
    }
  `;

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
    <motion.div className="drag-area" ref={constraintsRef}>
      <Radio activeTrack={activeTrack} setActiveTrack={(e) => setActiveTrack(e)}/>
      {Cassettes}
    </motion.div>
  )
};

export default Player;
