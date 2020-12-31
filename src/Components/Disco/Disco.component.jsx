import React, { useEffect } from 'react';
import styled from 'styled-components';
import './Disco.css';

// disco sparkel
const randomColor = (type) => {
  let r;
  
  // front side
  if(type === "bright") {
    r = randomNumber(130, 255);
    return "rgb(" + r + "," + r + "," + r + ")";
    
  } else { // backside
    r = randomNumber(130, 190);
    return "rgb(" + r + "," + r + "," + r + ")";

  }
}

// diversify the glitter
const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Disco = ({spinTheBall}) => {

  useEffect(() => {
    const radius = 65;
    const squareSize = 10;
    const prec = 19.55;
    const fuzzy = .01;
    const inc = (Math.PI - fuzzy) / prec;
    const discoBall = document.getElementById("ball");
  
  
    for (let t = fuzzy; t < Math.PI; t += inc) {
  
      const z = radius * Math.cos(t);
      const currentRadius = Math.abs((radius * Math.cos(0) * Math.sin(t)) - (radius * Math.cos(Math.PI) * Math.sin(t))) / 2.5;
      const circumference = Math.abs(2 * Math.PI * currentRadius);
      const squares = Math.floor(circumference / squareSize);
      const angleInc = (Math.PI * 2 - fuzzy) / squares;
  
      for (let i = angleInc / 2 + fuzzy; i < (Math.PI * 2); i += angleInc) {
        // make a square for the ball
        const square = document.createElement("div");
        const squareTile = document.createElement("div");
  
        // transform the square to fit on the ball
        squareTile.style.width = squareSize + "px";
        squareTile.style.height = squareSize + "px";
        squareTile.style.transformOrigin = "0 0 0";
        squareTile.style.transform = "rotate(" + i + "rad) rotateY(" + t + "rad)";
  
        // set the rotating illusion
        if ((t > 1.3 && t < 1.9) || (t < -1.3 && t > -1.9)) {
          squareTile.style.backgroundColor = randomColor("bright");
        } else {
          squareTile.style.backgroundColor = randomColor("any");
        }
  
        square.appendChild(squareTile);
        square.className = "square";
        squareTile.style.animation = "reflect 2s linear infinite";
        squareTile.style.animationDelay = String(randomNumber(0, 20) / 10) + "s";
        squareTile.style.backfaceVisibility = "hidden";
  
        // adjust square size
        const x = radius * Math.cos(i) * Math.sin(t);
        const y = radius * Math.sin(i) * Math.sin(t);
        square.style.transform = "translateX(" + x + "px) translateY(" + y + "px) translateZ(" + z + "px)";
        discoBall.appendChild(square);
      }
    }
  })

  return (
    <Container>
      <Light id="discoBallLight"></Light>
      <Dangle />
      <DiscoBall id="ball" spinTheBall={spinTheBall}>
        <DiscoBallMiddle spinTheBall={spinTheBall} />
      </DiscoBall>
    </Container>
  )
}

const Container = styled.div`
  position: absolute;
  top: -10%;
  left: 10%;
  display: flex;
  justify-content: center;
  width: 300px;
  height: 300px;
  animation: lowerDiscoBall 4s forwards;
`;

const Light = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  border-radius: 100%;
  background-color: rgb(255, 255, 255, .5); 
`;

const Dangle = styled.div`
  height: 100px;
  border: 3px dotted white; 
  transform: translate(50px, -120px);
  animation: ${props => props.spinTheBall && 'rotateDiscoBall 18s linear infinite'};

`;

const DiscoBall = styled.div`
  transform-style: preserve-3d;
  width: 100px;
  height: 100px;
  position: relative;

  animation: ${props => props.spinTheBall && 'rotateDiscoBall 18s linear infinite'};
`;

const DiscoBallMiddle = styled.div` 
  height: 100%;
  border-radius: 100%;
  position: relative;
  background-color: rgb(255, 255, 255, .8); 
  background: linear-gradient(top, #111, #333);
  animation: ${props => props.spinTheBall && 'rotateDiscoBall 18s linear infinite'};
`



export default Disco;
