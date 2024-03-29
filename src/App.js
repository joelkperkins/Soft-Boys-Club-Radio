// jshint ignore: start
import React, { useState, useEffect } from 'react';

// components
import Player from './Components/Player/Player.component';
import Header from './Components/Header.component';

// libraires
import axios from 'axios';
import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';

// resouces
import headerImg from './Images/text.png';

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

  const defaultTrack = {
    id: 'jungle',
    genre: null,
    title: 'Jungle',
    url: process.env.REACT_APP_JUNGLE_STATION,
    date: null,
    station: null,
    desc: null,
    heardBy: null,
    type: null
  };

  // zero sources
  if (!source) {
    return [defaultTrack];
  }
  //single source
  if (!Array.isArray(source)) {

    return [defaultTrack, {
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
    const icecastTracks = source.map((s, i) => ({
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
    );
    return [defaultTrack, ...icecastTracks]
  } 
};


const App = () => {
  const [data, setData] = useState({ tracks: [] });
  const [poster, setPoster] = useState('');
  const [gif, setGif] = useState('');
  const [zoom, setZoom] = useState('');
  const [height, setHeight] = useState('100vh');
  const [dancing, setDancing] = useState(false);
  const [activeBg, setActiveBg] = useState('');

  useEffect(() => {
    const fetchData = async () => {

      const result = await axios.get(
        process.env.REACT_APP_ICECAST_URL + "/status-json.xsl"
      );
      if (result.data) {
        const response = {
          adminEmail: result.data.icestats.admin,
          tracks: getTracks(result.data.icestats.source)
        };
        setData(response);
      }
    };
    const getStuff = async () => {
      await axios.get(process.env.REACT_APP_DB_LINK)
        .then(response => {
          if (response && response.data && response.data.length > 0) {
            setPoster(response.data.data[0].gigPoster);
            setGif(response.data.data[1].gigPoster);
            setZoom(response.data.data[0].zoomLink);
          }
        })
        .catch(error => {
          console.error(error);
        });
    };
    fetchData();
    getStuff();
  }, []);

  useEffect(() => {
    const vh = window.innerHeight;
    setHeight(`${vh}px`);
  }, []);

  useEffect(() => {
    // do stuff with the background
    if (dancing) {
      setActiveBg(gif);
    } else {
      setActiveBg(poster);
    }
  }, [dancing, gif, poster]);

  const openInNewTab = url => {
    var win = window.open(url, '_blank');
    win.focus();
  };

  return (
    <Body id="main" height={height} img={activeBg} header={headerImg}>
      <Header zoom={zoom} />
      <Player tracks={data.tracks} setDancing={() => setDancing(!dancing)} />
      <Footer onClick={() => openInNewTab('https://github.com/joelkperkins/Soft-Boys-Club-Radio')}>
        Wanna see how it works? 
        <AiFillGithub size='1.3em'/> 
        'v0.1.6'
      </Footer>
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
  height: 1.2rem;
  bottom: 0;
  right: 0;
  width: 100%;
  font-family: 'Courier New';
  color: gray;
  background-color: black;
  padding: 0 .25rem;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

export default App;
