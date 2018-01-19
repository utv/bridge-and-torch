import React from 'react'
import Circle from './Circle'
export default class CirCleContainer extends React.Component {
  render() {
    const { weight, side } = this.props
    let cirCleWeight = ''
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
    }

    return (
      <Circle
        bgColor={bgColor}
        onClick={this.props.onClick}
      >
        {cirCleWeight}
      </Circle>
    )
  }
}