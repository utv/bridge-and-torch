import React from 'react'
import './Side.css'

export default class Side extends React.Component {

  render() {
    return (
      <div className='wrapper'>
        <ul className='side left'>
          <li className='side-item'>1</li>
          <li className='side-item'>2</li>
          <li className='side-item'>3</li>
        </ul>
        <div className='middle'>
          test
        </div>
        <ul className='side right'>
          <li className='side-item'>1</li>
          <li className='side-item'>2</li>
          <li className='side-item'>3</li>
        </ul>
      </div>

    )
  }
}