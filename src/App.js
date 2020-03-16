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

const App = () => {
  const [data, setData] = useState({tracks: []});

  useEffect(() => {
    const fetchData = async () => {

      const result = await axios.get(
        'https://icecast.softboys.club:18000/status-json.xsl',
      );

      //immediately invoked function expression
      const response = {
        adminEmail: result.data.icestats.admin,
        tracks: !Array.isArray(result.data.icestats.source)
          ? ((s=result.data.icestats.source) => (
            [{
              id: 'track0',
              genre: s.genre || null,
              title: s.title || '<no track data>',
              url: s.listenurl || null,
              date: s.stream_start || null,
              station: s.server_name || null,
              desc: s.server_description || null,
              heardBy: s.listener_peak || null,
              type: s.server_type || null
            }]
          ))()
          : result.data.icestats.source.map((s, i) => {
            return {
              id: 'track' + i,
              genre: s.genre || null,
              title: s.title || '<no track data>',
              url: s.listenurl || null,
              date: s.stream_start || null,
              station: s.server_name || null,
              desc: s.server_description || null,
              heardBy: s.listener_peak || null,
              type: s.server_type || null
            }
          }
        )
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
