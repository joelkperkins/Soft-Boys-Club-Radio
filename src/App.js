import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player from './Components/Player/Player.component';
import Header from './Components/Header.component';
import styled from 'styled-components'

const siteUrl = 'https://icecast.softboys.club:18000';

const ssl = (listenurl) => {
  let trackpath = !listenurl ? null : listenurl.slice(listenurl.lastIndexOf('/'));
  return siteUrl + trackpath;
};

const getTracks = (source) => {
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
      url: ssl(source.listenurl),
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
      url: ssl(s.listenurl),
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

  useEffect(() => {
    const fetchData = async () => {

      const result = await axios.get(
        siteUrl + "/status-json.xsl"
      );

      const response = {
        adminEmail: result.data.icestats.admin,
        tracks: getTracks(result.data.icestats.source)
      }

      setData(response);
    };
    fetchData();
  }, []);

  return (
    <Body id="main">
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
  height: 100vh;
  background-color: black;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Footer = styled.div`
  position: fixed;
  bottom: .5rem;
  left: 1rem;
  font-family: 'Arima Madurai', cursive;
  color: gray;
`

export default App;
