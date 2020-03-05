import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue } from "framer-motion"


const Title = styled.div`
  text-align: center;
  font-family: 'Rock Salt', cursive;
  font-size: .6rem;
  color: black;
  width: 90%;
  height: 3rem;
  border: solid .1rem black;
  border-radius: .3rem;
  padding: .3rem;
  background: #fffd82;
`;

const CassetteOpen = styled.div`
  position: relative;
  padding-top: .25rem;
  padding-bottom: .25rem;
  width: 15rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  cursor: pointer;
  border: double .3rem white;
  border-radius: .5rem;
  overflow: hidden;
  background: #ee4266;
`;

const CassetteClosed = styled.div`
  padding-top: .25rem;
  padding-bottom: .25rem;
  width: 15rem;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  cursor: pointer;
  border-top: double .3rem white;
  border-left: double .3rem white;
  border-right: double .3rem white;
  border-radius: .5rem;
  overflow: hidden;
  background: #ee4266
`;

const CassetteBottom = styled.div`
  font-family: 'Rock Salt', cursive;
  font-size: .5rem;
  display: flex;
  justify-content: center;
  width: 12rem;
  border: solid .1rem black;
  border-radius: .3rem;
  height: 1.3rem;
  margin-top: auto;
  background: #fffd82;
`;

const Holes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 10rem;
  padding: 1rem;
  height: auto;
`;

const Hole = styled.div`
  width: 2rem;
  height: 2rem;
  background: black;
  border-radius: 50%;
  border: dashed .3rem white;
`;

// function to get the y value of an element
const getPos = (el) => {
  for (var ly=0; el != null; ly += el.offsetTop, el = el.offsetParent);
  return ly;
}

const Cassette = ({activeTrack, track, index, constraintsRef, reduced, setActiveTrack}) => {
  const thisTrack = useRef();
  const yTrack = useRef();
  const yRaidoInsert = useRef();
  const y = useMotionValue(0);

  // gets the y values needed for track selection
  useEffect(() => {
    // get the track ele
    thisTrack.current = document.getElementById(`track-key-${index}`);
    // initial y value for track ele
    yTrack.current = getPos(thisTrack.current);
    // initial y value for the track loader
    yRaidoInsert.current = document.getElementById('insert-here');
    // the y value at the bottom of the track loader, use this as reference for when to set a track to active
    yRaidoInsert.current = getPos(yRaidoInsert.current) + yRaidoInsert.current.clientHeight;
  }, [index]);

  // allows a user to set a track to active by dragging it to the loader
  useEffect(() => {
    // uses the initial y value of the element + the amount it was dragged to determine if it has been dragged down to the track loader
    function checkActive() {
      if ((yTrack.current + y.get() + thisTrack.current.clientHeight >= yRaidoInsert.current) && (!activeTrack)) {
        setActiveTrack(track);
      }
    }

    const unsubscribeY = y.onChange(checkActive)

    return () => {
      unsubscribeY()
    }
  }, [activeTrack, setActiveTrack, track, y]);

  if (reduced) {
    return (
      <CassetteClosed>
        <Title>{track.station}</Title>
      </CassetteClosed> 
    )
  } else if (activeTrack === null || activeTrack.station !== track.station) {
    return (
      <motion.div id={`track-key-${index}`} drag style={{ y }} dragConstraints={constraintsRef} >
        <CassetteOpen>
          <Title>{track.station}</Title>
          <Holes>
              <Hole></Hole>
              <Hole></Hole>
          </Holes>
          <CassetteBottom>{track.genre}</CassetteBottom>
        </CassetteOpen>
      </motion.div>
    );
  }
}

export default Cassette;

