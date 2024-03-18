import React from 'react'
import '../pages/home.css'
import { useGameSettings } from '../GameSettingsProvider'
import '../pages/home.css'
import { ImageButton } from '../pages/Home'
import playButton from '../images/done.svg'

const ChangeBoard: React.FC = () => {
  const { setBoardSize, setShowResp, showResp } = useGameSettings()

  const handleNavigateHome = () => {
    setShowResp('ChangeBoard', !showResp['ChangeBoard']) // Hide the response content for the 'ChangeBoard' button
  }

  const handleBoardClick = (size: number) => {
    setBoardSize(size)
  }

  return (
    <div className="overlaySetting">
      <div className="overlayBox">
        <div className="overlayInside">
          <h3>Pick Your Board Size</h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              justifyContent: 'center',
            }}
          >
            <p onClick={() => handleBoardClick(4)}>4</p>
            <p onClick={() => handleBoardClick(6)}>6</p>
            <p onClick={() => handleBoardClick(8)}>8</p>
            <p onClick={() => handleBoardClick(10)}>10</p>
          </div>
          <ImageButton
            width={'23.81vw'}
            name={'playButton'}
            height={'5.43vh'}
            alt={'play button'}
            imagesrc={playButton}
            resp={handleNavigateHome}
          />
        </div>
      </div>
    </div>
  )
}

export default ChangeBoard
