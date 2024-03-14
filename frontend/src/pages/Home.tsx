import React, { ReactNode, useState } from 'react'
import pageArt from '../images/page-art.svg'
import Title from '../images/title.svg'
import SinglePlayer from '../images/single-player.svg'
import Multiplayer from '../images/multiplayer.svg'
import Online from '../images/online.svg'
import Board from '../components/board'
import './home.css'
import ChangeBoard from '../images/change-board.svg'
import ChangePeice from '../images/change-peice.svg'
import ViewStats from '../images/view-stats.svg'
import ChangeColor from '../components/change_color'
import ChangeBoardSize from '../components/change_board'
import { useGameSettings } from '../GameSettingsProvider';



interface ImageButtonProps {
  width: string;
  height: string;
  name: string;
  alt: string;
  imagesrc: string;
  resp: ReactNode | (() => void);
}

export const ImageButton: React.FC<ImageButtonProps> = ({
  width,
  height,
  name,
  alt,
  imagesrc,
  resp,
}) => {
  const { showResp, setShowResp } = useGameSettings();

  const handleButtonClick = () => {
    setShowResp(name, !showResp[name]);
    if (typeof resp === 'function') {
      (resp as () => void)();
    }
  };

  return (
    <div id={name}>
      <button
        className={name}
        onClick={handleButtonClick}
        style={{ border: 'none', background: 'none', padding: 0 }}
      >
        <img
          src={imagesrc}
          alt={alt}
          style={{ cursor: 'pointer', width: width, height: height }}
        />
      </button>
      {showResp[name] && (typeof resp !== 'function' ? resp : null)}
    </div>
  );
};

function Home() {
  const {  currboardSize} = useGameSettings();
  const darkcolor ='#416072'
  const lightcolor='#5292CD'
  return (
    <div>
      <img src={pageArt} alt="page art" className="pageArt" />
      <div className='main'>
      <div className='intro'>
      <img src={Title} alt="pageTitle" className="pageTitle" />
      <div className='starting-tiles'>
      <ImageButton
        width={'28.95vw'}
        name={'singlePlayer'}
        height={'5.43vh'}
        alt={'single player button'}
        imagesrc={SinglePlayer}
        resp={'clicked single player'}
      />
      <ImageButton
        width={'20.73vw'}
        name={'multiPlayer'}
        height={'5.43vh'}
        alt={'multiplayer button'}
        imagesrc={Multiplayer}
        resp={'clicked multiplayer'}
      />
      <ImageButton
        width={'20.73vw'}
        name={'online'}
        height={'5.43vh'}
        alt={'online button'}
        imagesrc={Online}
        resp={'clicked play online'}
      />
        </div>
      </div>
      <div className="board-all">
        <div className="board">
          <Board
            size={currboardSize}
            darkColor={darkcolor}
            lightColor={lightcolor}
          />
        </div>
        <div
          className="displayChanges" style={{width: `${currboardSize * 7.152}vh`}}
        >
          <ImageButton
            width={'9.26vw'}
            name={'ChangeBoard'}
            height={'5.43vh'}
            alt={'Change Board button'}
            imagesrc={ChangeBoard}
            resp={<ChangeBoardSize />}
          />
          <ImageButton
            width={'9.26vw'}
            name={'ChangePeice'}
            height={'5.43vh'}
            alt={'Change Peice button'}
            imagesrc={ChangePeice}
            resp={<ChangeColor />}
          />
          <ImageButton
            width={'9.26vw'}
            name={'ViewStats'}
            height={'5.43vh'}
            alt={'View Stats button'}
            imagesrc={ViewStats}
            resp={'clicked View Stats'}
          />
        </div>
      </div>
      </div>
    </div>
  )
}

export default Home
