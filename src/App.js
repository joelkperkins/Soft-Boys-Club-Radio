import React, { useState, useEffect } from 'react';

// components
import Player from './Components/Player/Player.component';
import Header from './Components/Header.component';
import DonationTracker from './Components/DonationTracker.component';

// libraires
import axios from 'axios';
import styled from 'styled-components';
import { AiFillGithub } from 'react-icons/ai';

// resouces
import headerImg from './Images/text.png'

const imgUrl = () => {
  let keyUrl = process.env.REACT_APP_ICECAST_URL + "/static/feature.jpg";
  return keyUrl;
}
 
const splitImgUrl1 = () => {
  let tempUrl = process.env.REACT_APP_ICECAST_URL + "/static/feature1.jpg";
  return tempUrl;
}

const splitImgUrl2 = () => {
  let tempUrl = process.env.REACT_APP_ICECAST_URL + "/static/feature2.jpg";
  return tempUrl;
}

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
      if (result.data) {
        const response = {
          adminEmail: result.data.icestats.admin,
          tracks: getTracks(result.data.icestats.source)
        }
  
        setData(response);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const vh = window.innerHeight;
    setHeight(`${vh}px`);
  }, []);

  const openInNewTab = url => {
    var win = window.open(url, '_blank');
    win.focus();
  }

	const SetBackground = () => {
		console.log(process.env.REACT_APP_SPLIT_IMG);
  	/* 1 or 2 posters in the background */
  	if (process.env.REACT_APP_SPLIT_IMG === 0) {
			console.log("so");
			return (
     		<Background>
	  				<img id="background" src={splitImgUrl1()} alt="gig poster"/>
	  				<img id="background" src={splitImgUrl2()} alt="gig poster"/>
     		</Background>
			);
		} else {
			console.log("what`");
      return (
     		<Background>
					<img id="background" src={imgUrl()} alt="gig poster"/>
     		</Background>
			);
		}

	}

  return (
    <Body id="main" height={height} header={headerImg} >
		<Header />
    <DonationTracker />
		{SetBackground()}
		<Player tracks={data.tracks} />
		<Footer onClick={() => openInNewTab(process.env.REACT_APP_GH_LINK)}>Wanna see how it works? <AiFillGithub size='1.3em'/> v0.1.4</Footer>
    </Body>
  );
}

const Background = styled.div`
  position: absolute;
	display: flex;
	top: 3rem;

  @media only screen and (orientation: portrait) {
		flex-direction: column;
  }
  @media (min-width: 800px) {
		flex-direction: row;
  }
`;

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
  justify-content: center;
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
