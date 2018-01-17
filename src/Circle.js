import React from 'react'

export default class Circle extends React.Component {
  render() {
    // const value = this.props
    const bgColor = typeof this.props.bgColor !== 'undefined' ? this.props.bgColor : 'darkcyan'
    return (
      <div style={{
        margin: '5px',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: bgColor,
        lineHeight: '100px'
      }}>
        {this.props.children}
      </div>
    )
  }
}