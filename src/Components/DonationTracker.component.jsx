import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { FaHandHoldingHeart } from 'react-icons/fa';


const DonationTracker = () => {

  const [totalDonationAmount, setTotalDonationAmount] = useState(null);
  const intervalRef = useRef(null)

  window.googleDocCallback = function () { return true; };

  useEffect(() => {
    const getDonations = () => {
      Axios.get('https://api.apispreadsheets.com/data/1192/')
      .then(response => {
        const amount = response.data.data[0].donationTotal;
        setTotalDonationAmount(amount);
      });
    }
    getDonations();
    intervalRef.current = setInterval(() => getDonations(), 1000 * 60)// 1 per minute

    return () => {
      clearInterval(intervalRef.current);
    }
  }, []);

  const openInNewTab = url => {
    var win = window.open(url, '_blank');
    win.focus();
  }

  return (
    <Container>
      <Row>
        <Row>
          <Logo onClick={() => openInNewTab('https://www.beam.community/donation')} src='https://images.squarespace-cdn.com/content/57b7400ebe65946ef828f100/1492278744096-ANIH1CQRO3BTAHTPZZQV/BEAM_logo_transparent+%282%29.png?content-type=image%2Fpng' alt='BEAM logo' />
        </Row>
        <DonationBox>
          <Col>
            <Text>Total: </Text>
            <DollarAmount>{totalDonationAmount}</DollarAmount>
          </Col>
        </DonationBox>
      </Row>
      <DonateButton onClick={() => openInNewTab(process.env.REACT_APP_DONATE_LINK)}>
        <FaHandHoldingHeart size="1em" color='#F0B466' style={{marginRight: '.5rem'}}/>
        <DonateText>Donate Here</DonateText>
        <FaHandHoldingHeart size="1em" color='#518FC0' style={{marginLeft: '.5rem'}}/></DonateButton>
    </Container>
  )
};

const Container = styled.div`
  @media (min-width: 800px) {
    width: calc(30%);
  }
  width: calc(70%);
  top: 3rem;
  left: .5rem;
  position: absolute;
  z-index: 100;
  align-self: flex-start;
  border: 4px solid #E0B650;
  border-radius: 4px;
  background-color: rgb(255,255,255, .8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DonationBox = styled.div`
  width: 100%;
  padding: .5rem;
`

const Logo = styled.img`
  width: 100%;
  background-color: rgb(255,255,255, .9);
`

const Col = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const Text = styled.div`
  font-family: 'Arima Madurai', cursive;
  color: black;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`
const DonateText = styled.div`
  font-family: 'Dosis', cursive;
  font-weight: bold;
  color: black;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DollarAmount = styled.div`
  font-family: 'Arima Madurai', cursive;
  color: black;
  font-size: 1rem;
  font-weight: 800;
  background-color: #FFE186;
`

const DonateButton = styled.div`
  width: 85%;
  background-color: white;
  border: 2px solid pink;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: .5rem;
`

export default DonationTracker;
