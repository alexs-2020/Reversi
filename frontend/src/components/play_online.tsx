import React, { useState } from 'react'
import Login from '../components/login'
import { useGameSettings } from '../GameSettingsProvider'
const PlayOnline : React.FC = () => {
    const { setBoardSize, setShowResp, showResp,game } = useGameSettings()

    const handleNavigateHome = () => {
      setShowResp('online', !showResp['online']) // Hide the response content for the 'ChangeBoard' button
      
    }
   return(
    <div className="overlaySetting">
      <div className="overlayBox">
        <div className="overlayInside">
            <h3> Play Online</h3>
            <Login  />
       </div>
       </div>
    </div>
   )
    
}
export default PlayOnline