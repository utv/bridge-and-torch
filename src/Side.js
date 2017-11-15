import React from 'react'
import PropTypes from 'prop-types'
import './Side.css'

export default class Side extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const listItems = typeof this.props.weights !== 'undefined'
      ? this.props.weights.map((w, idx) => (
        <li
          key={idx}
          className='side-item'
        >
          <div className='circle'>
            <input type='text' className='weight-input' />
          </div>
        </li>
      ))
      : null
    return (
      <ul className='side left'>
        {listItems}
      </ul>
    )
  }
}

Side.PropTypes = {
  left: PropTypes.bool
}
