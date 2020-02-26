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
    padding: 1rem 0rem;
`;

const App = () => {
  const [data, setData] = useState({tracks: []});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://mariner.whatbox.ca:18000/status-json.xsl',
      );
      const response = {
        adminEmail: result.data.icestats.admin,
        tracks: result.data.icestats.source.map((s, i) => {
          return {
            id: 'track' + i,
            genre: s.genre || null,
            title: s.title || null,
            url: s.listenurl || null,
            date: s.stream_start || null,
            desc: s.server_description || null,
            heardBy: s.listener_peak || null,
            artist: s.artist || null
          }
        })
      }
      setData(response);
    };
    fetchData();
  }, []);
  return (
    <Body>
      <Header />
      <Player tracks={data.tracks} />
    </Body>
  );
}

export default App;
