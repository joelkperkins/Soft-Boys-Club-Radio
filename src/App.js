import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player from './Components/Player';
import Header from './Components/Header';
import styled from 'styled-components'

const Body = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: black;
    overflow: none;
    scroll: none;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const siteUrl = 'https://icecast.softboys.club:18000';
const sslUrl = (trackUrl) => {
  let keyUrl = !trackUrl ? null : trackUrl.slice(trackUrl.lastIndexOf('/'));
  return siteUrl + keyUrl;
};
const getTracks = (source) => {
  // zero sources
  if (!source) {
    return [];
  }
  //single source
  if (!Array.isArray(source)) {
    console.log("single source");

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
    <Body>
      <Header />
      <Player tracks={data.tracks} email={data.adminEmail}/>
    </Body>
  );
}

export default App;
