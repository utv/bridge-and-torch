import React from 'react'

export default class Circle extends React.Component {
  render() {
    return (
      <div style={{
        width: this.props.radius * 2,
        height: this.props.radius * 2,
        borderRadius: this.props.radius
      }}>
      </div>
    )
  }
}