import React from 'react'
import PropTypes from 'prop-types'
import './Side.css'

export default class Side extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <ul className='side left'>
        <li className='side-item'>
          <div className='circle'>
            <input
              type='text'
              className='weight-input'
            />
          </div>
        </li>
      </ul>
    )
  }
}

Side.PropTypes = {
  left: PropTypes.bool
}
