import React from 'react'
import './Loader.css'

interface LoaderProps {
  visible: boolean
}

/**
 * ### Loader Component
 * This is the Loader Component... it displays a loading spinner and L O A D I N G.
 * @returns React.FC => \<Loader \/\>
 * @author Neko
 * @license GPLv3.0
 */
const Loader: React.FC<LoaderProps> = ({ visible }) => {
  return (
    <div className={`app-loader ${visible ? 'show' : 'hide'}`} aria-hidden={!visible}>
      <div className="loader-content">
        <div className="spinner" aria-label="L O A D I N G" />
        <div className="loader-text">L O A D I N G...</div>
      </div>
    </div>
  )
}

export default Loader
