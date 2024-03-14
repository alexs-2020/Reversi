import React, { useState } from 'react';
import Chips from './chips';
import '../pages/home.css';
import { ImageButton } from '../pages/Home';
import playButton from '../images/play.svg';
import { useGameSettings } from '../GameSettingsProvider';



const lightcolor: string = '#D4F4FE';
const darkcolor: string = '#416072';

const ChangeColor: React.FC = () => {
  const { setStartingPieceColor, setShowResp,showResp,startingPieceColor } = useGameSettings();
  const handleNavigateHome = () => {
    setShowResp('ChangePeice',!showResp['ChangePeice']); // Hide the response content for the 'ChangePeice' button
  };

  const handleChipClick = (color: string) => {
    setStartingPieceColor(color);
  };

  return (
    <div className='overlaySetting'>
    <div className='overlayBox'>
      <div className='overlayInside'>
      <h3>Pick Your Color</h3>
        <div style={{display:'flex', flexDirection:'row', gap:'20px', justifyContent:'center'}}>
      <Chips color={lightcolor} onClick={() => handleChipClick(lightcolor)} />
      <Chips color={darkcolor} onClick={() => handleChipClick(darkcolor)} />  </div>
      <ImageButton width={'23.81vw'} name={'playButton'} height={'5.43vh'} alt={'play button'}
                   imagesrc={playButton} resp={handleNavigateHome}/>
        </div>
    </div>
      </div>
  );
}

export default ChangeColor;