import React from 'react'
import './App.css'

export default class WeightList extends React.Component {
  render() {
    if (typeof this.props.items === 'undefined') return null
    return this.props.items.map((val, idx) => (
      <li
        key={idx}
        className='side-item'
      >
        <div className='circle'>
          {val > 0 ? val : val * -1}
        </div>
      </li>
    ))
  }
}