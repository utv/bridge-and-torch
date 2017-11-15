import React from 'react'
import PropTypes from 'prop-types'
import './Middle.css'

export default class Middle extends React.Component {
  render() {
    const readyButton = this.props.isReadyButtonShow ? <button>Ready</button> : null
    return (
      <div className='middle'>
        <div className='middle-item'>
          {readyButton}
        </div>
      </div>
    )
  }
}

Middle.PropTypes = {
  isReadyButtonShow: PropTypes.bool
}

Middle.defaultProps = {
  isReadyButtonShow: false
}