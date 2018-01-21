import React from 'react'
import Circle from './Circle'

export default class CirCleContainer extends React.Component {

  render() {
    // if (typeof weight === 'undefined' || typeof side === 'undefined') return null

    const { weight } = this.props
    const borderStyle = typeof this.props.selected !== 'undefined' && this.props.selected
      ? 'solid'
      : ''
    /* let cirCleWeight = ''
    let bgColor = ''

    if (weight > 0 && side === 'L') {
      bgColor = 'crimson'
      cirCleWeight = weight
    }
    else if (weight < 0 && side === 'L') {
      bgColor = 'darkcyan'
      cirCleWeight = ''
    }
    else if (weight < 0 && side === 'R') {
      bgColor = 'crimson'
      cirCleWeight = weight
    } */

    return (
      <Circle
        bgColor={this.props.weight !== undefined ? 'crimson' : 'darkcyan'}
        borderStyle={borderStyle}
        onClick={this.props.onClick}
      >
        {weight}
      </Circle>
    )
  }
}