import React from 'react'

export default class Circle extends React.Component {
  static defaultProps = {
    backgroundColor: 'darkcyan'
  }

  render() {
    const { selected, backgroundColor } = this.props
    const border =
      typeof selected !== 'undefined' && selected
        ? `2px solid`
        : 'none'

    return (
      <div
        style={{
          margin: '5px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          lineHeight: `100px`,
          backgroundColor: backgroundColor,
          border: border,
          boxSizing: 'border-box'
        }}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    )
  }
}