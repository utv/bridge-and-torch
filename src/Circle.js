import React from 'react'

export default class Circle extends React.Component {
  static defaultProps = {
    backgroundColor: 'darkcyan'
  }

  render() {
    const border =
      typeof this.props.selected !== 'undefined' && this.props.selected
        ? '2px solid'
        : ''
    const backgroundColor = this.props.backgroundColor
    const outline = this.props.selected ? 'solid' : 'none'
    console.log('backgroundColor', backgroundColor)
    return (
      <div
        style={{
          margin: '5px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          lineHeight: '100px',
          backgroundColor: this.props.backgroundColor,
          border: border,
        }}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    )
  }
}