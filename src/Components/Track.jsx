import React from 'react';
import styled from 'styled-components';
import TrackInfo from './TrackInfo';
import Button from './Button';

const testImages= [
  "https://66.media.tumblr.com/e7e05d3dd68faecd7ce3762cb5fa83ee/tumblr_pxz262Xbz21sfie3io1_1280.jpg",
  "https://66.media.tumblr.com/d17dadf3d3b2e2e52f5d8afeede3e661/tumblr_pxz26186vO1sfie3io1_1280.jpg",
  "https://66.media.tumblr.com/2354f4ee708c5d350ff2fc68a511f2a9/tumblr_pxz25yf7ug1sfie3io1_1280.jpg",
  "https://66.media.tumblr.com/489bf82652c7b6feac25268e55c2d413/tumblr_pxz25whwBw1sfie3io1_1280.jpg",
  "https://66.media.tumblr.com/6bd14bf9634da929f9f856c57bdfdb0c/tumblr_pxz25vHBkW1sfie3io1_1280.jpg",
  "https://66.media.tumblr.com/5abcabb5b89b05657982f1c16cfb1fe0/tumblr_pxz25tTHG51sfie3io1_1280.jpg",
  "https://66.media.tumblr.com/2b3dc153760fcf9561ddb13ea7263b8f/tumblr_pxz25s8o3Z1sfie3io1_1280.jpg",
  "https://66.media.tumblr.com/2a43452e0d8a1618b1efb68301692a63/tumblr_pxz25q3ZDx1sfie3io1_1280.jpg",
  "https://66.media.tumblr.com/6fd84be76444e90b1639a7865f6b0009/tumblr_pxz25pnRfG1sfie3io1_1280.jpg",
  "https://66.media.tumblr.com/dd22317bb43df73935aedfbba4fe26d9/tumblr_pxz25z7tLX1sfie3io1_1280.jpg"
];

const Row = styled.div`
@media only screen and (orientation: portrait) {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1rem 1rem;
  overflow: none;
}
`;

const Audio = styled.audio`
  background-color: transparent;
`;

const Track = ({index, t, playing, handleClick }) => {
  return ( 
    <Row key={`track-key-${index}`} onClick={() => handleClick(t.id)} style={{ backgroundImage: `url(${testImages[Math.round(Math.random() * 10)]})` }}>
      <Audio id={t.id} src={t.url}></Audio>
      <Button id={t.id} playing={playing} />
      <TrackInfo title={t.title} artist={t.artist} genre={t.genre} desc={t.desc} heardBy={t.heardBy} date={t.date} />
    </Row>
  )
}

export default Track;
