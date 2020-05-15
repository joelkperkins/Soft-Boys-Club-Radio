import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue } from "framer-motion"

// function to get the x, y value of an element
const getPos = (el) => {
  for (var ly=0, lx=0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
  return {x: lx, y: ly};
}

const checkY = (y, trackXY, thisTrack, raidoInsertXY, activeTrack) => {
  if ((trackXY.current.y + y.get() + thisTrack.current.clientHeight >= raidoInsertXY.current.y) && (!activeTrack)) {
    return true;
  } else {
    return false;
  }
}

const checkX = (x, trackXY, thisTrack, raidoInsertXY, activeTrack) => {
  if ((trackXY.current.x + x.get() + thisTrack.current.clientHeight >= raidoInsertXY.current.x) && (!activeTrack)) {
    return true;
  } else {
    return false;
  }
}

const Cassette = ({activeTrack, track, index, constraintsRef, reduced, setActiveTrack}) => {
  const thisTrack = useRef();
  const trackXY = useRef();
  const raidoInsertXY = useRef();
  const y = useMotionValue(0);
  const x = useMotionValue(0);

  // gets the y values needed for track selection
  useEffect(() => {
    // get the track ele
    thisTrack.current = document.getElementById(`track-key-${index}`);
    // initial x, y value for track ele
    trackXY.current = getPos(thisTrack.current);
    // get track loader
    const trackLoader = document.getElementById('insert-here');
    // initial y value for the track loader
    raidoInsertXY.current = getPos(trackLoader);
    // the x, y value at the bottom of the track loader, use this as reference for when to set a track to active
    raidoInsertXY.current.y += trackLoader.clientHeight;
  }, [index]);

  // allows a user to set a track to active by dragging it to the loader
  useEffect(() => {
    // uses the initial y value of the element + the amount it was dragged to determine if it has been dragged down to the track loader
    function checkActive() {
      if (checkY(y, trackXY, thisTrack, raidoInsertXY, activeTrack) && checkX(x, trackXY, thisTrack, raidoInsertXY, activeTrack)) {
        setActiveTrack(track);
      }
    }

    const unsubscribeY = y.onChange(checkActive)
    const unsubscribeX = x.onChange(checkActive)

    return () => {
      unsubscribeY();
      unsubscribeX();
    }
  }, [activeTrack, setActiveTrack, track, x, y]);

  if (reduced) {
    return (
      <CassetteClosed>
        <Title>{track.title}</Title>
      </CassetteClosed> 
    )
  } else if (activeTrack === null || activeTrack.station !== track.station) {
    return (
      <motion.div id={`track-key-${index}`} drag style={{ x, y }} dragConstraints={constraintsRef} >
        <CassetteOpen>
        <Title>{track.title}</Title>
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

// const THEME_TITLE = styled(Title)`
//   background: #F3F6F9;
//   border: solid .1rem #F3F6F9;
//   color: #FFE186;
// `

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

// const THEME_CASSETTE_OPEN = styled(CassetteOpen)`
//   background: white;
//   border: double .3rem #F3F6F9;
// `

const CassetteClosed = styled.div`
  padding-top: .25rem;
  padding-bottom: .25rem;
  width: 15rem;
  height: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  cursor: pointer;
  border-top: double .3rem white;
  border-left: double .3rem white;
  border-right: double .3rem white;
  border-radius: .5rem;
  overflow: hidden;
  background: #ee4266;
`;

// const THEME_CASSETTE_CLOSED = styled(CassetteClosed)`
//   background: white;
//   border: double .3rem #F3F6F9;
// `

const CassetteBottom = styled.div`
  font-family: 'Rock Salt', cursive;
  font-size: .5rem;
  display: flex;
  justify-content: center;
  width: 12rem;
  border: solid .1rem black;
  border-radius: .3rem;
  height: 1.3rem;
  background: #fffd82;
`;

// const THEME_CASSETTE_BOTTOM = styled(CassetteBottom)`
//   background: #F3F6F9;
//   border: solid .1rem #F3F6F9;
//   color: #FFE186;
// `

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

// const THEME_HOLE = styled(Hole)`
//   border: dashed .3rem transparent;
// `

export default Cassette;

