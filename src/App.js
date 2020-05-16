import React, { useState, useEffect } from 'react';

// components
import Player from './Components/Player/Player.component';
import Header from './Components/Header.component';

// libraires
import axios from 'axios';
import styled from 'styled-components'

// resouces
import backgroundImg from './Images/feature.png'
import headerImg from './Images/text.png'

const sslUrl = (trackUrl) => {
  let keyUrl = !trackUrl ? null : trackUrl.slice(trackUrl.lastIndexOf('/'));
  return process.env.REACT_APP_ICECAST_URL + keyUrl;
};

const getTracks = (source) => {
  //implement in the future
  const onetape = false;
  if (onetape === true ) {
    return source.reduce((acc, curr, index) => {
      if (curr.title === 'Doomtown') {
        acc.push({
          id: 'track' + index,
          genre: curr.genre || null,
          title: curr.title || '<no track data>',
          url: sslUrl(curr.listenurl),
          date: curr.stream_start || null,
          station: curr.server_name || null,
          desc: curr.server_description || null,
          heardBy: curr.listener_peak || null,
          type: curr.server_type || null
          });
      }
      return acc;
    }, []);
  }

  // zero sources
  if (!source) {
    return [];
  }
  //single source
  if (!Array.isArray(source)) {

    return [{
      id: 'track0',
      genre: source.genre || null,
      title: source.title || '<no track data>',
      url: sslUrl(source.listenurl),
      date: source.stream_start || null,
      station: source.server_name || null,
      desc: source.server_description || null,
      heardBy: source.listener_peak || null,
      type: source.server_type || null
    }];

  //array of sources
  } else {
    return source.map((s, i) => ({
      id: 'track' + i,
      genre: s.genre || null,
      title: s.title || '<no track data>',
      url: sslUrl(s.listenurl),
      date: s.stream_start || null,
      station: s.server_name || null,
      desc: s.server_description || null,
      heardBy: s.listener_peak || null,
      type: s.server_type || null
      })
    )
  } 
};


const App = () => {
  const [data, setData] = useState({tracks: []});
  const [height, setHeight] = useState('100vh');
  useEffect(() => {
    const fetchData = async () => {

      const result = await axios.get(
        process.env.REACT_APP_ICECAST_URL + "/status-json.xsl"
      );

      const response = {
        adminEmail: result.data.icestats.admin,
        tracks: getTracks(result.data.icestats.source)
      }

      setData(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const vh = window.innerHeight;
    setHeight(`${vh}px`);
  }, []);

  return (
    <Body id="main" height={height} img={backgroundImg} header={headerImg}>
      <Header />
      <Player tracks={data.tracks} />
      <Footer>v0.1.3</Footer>
    </Body>
  );
}

const Body = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: ${props => props.height};
  background-color: black;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (orientation: portrait) {
    ${props => props.img && props.header &&
      `background: 
        url(${props.img}) black center no-repeat;
      `
    }
    ${props => props.img && `background-size: 650px`}
  }


  @media (min-width: 800px) {
    ${props => props.img && props.header &&
      `background:
        url(${props.img}) black center no-repeat;
      `
    }
    ${props => props.img && `background-size: 650px`}
  }
`;

const Footer = styled.div`
  position: fixed;
  bottom: .5rem;
  left: 1rem;
  font-family: 'Arima Madurai', cursive;
  color: gray;
`

export default App;
