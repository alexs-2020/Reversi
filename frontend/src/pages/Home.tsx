import React from 'react'
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

interface MyComponentProps {
  boardSize: number
}

interface ImageButtonProps {
  width: string
  name: string
  height: string
  alt: string
  imagesrc: string
  resp: string // Assuming that the resp parameter is a function with no arguments and no return value
}

const ImageButton: React.FC<ImageButtonProps> = ({
  width,
  height,
  name,
  alt,
  imagesrc,
  resp,
}) => {
  const handleButtonClick = () => {
    // Add your button click logic here
    console.log(resp)
  }

  return (
    <div>
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
    </div>
  )
}

function Home() {
  const boardSize = 8
  return (
    <div>
      <img src={pageArt} alt="Dynamic Image" className="pageArt" />
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
            size={boardSize}
            darkColor={'#416072'}
            lightColor={'#D4F4FE'}
          />
          {/*<div className='rectBoard' style={{*/}
          {/*  width: `${boardSize * 6.93}vh`,*/}
          {/* height: `${(boardSize * 7.15) + 5.77}vh`,*/}
          {/*  border: `${boardSize * 0.1}px solid #000`,*/}
          {/*}}>*/}
          {/*</div>*/}
        </div>
        <div
          className="displayChanges" style={{width: `${boardSize * 7.152}vh`}}
        >
          <ImageButton
            width={'9.26vw'}
            name={'ChangeBoard'}
            height={'5.43vh'}
            alt={'Change Board button'}
            imagesrc={ChangeBoard}
            resp={'clicked Change Board'}
          />
          <ImageButton
            width={'9.26vw'}
            name={'ChangePeice'}
            height={'5.43vh'}
            alt={'Change Peice button'}
            imagesrc={ChangePeice}
            resp={'clicked ChangePeice'}
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
