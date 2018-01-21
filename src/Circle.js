import React from 'react'

export default class Circle extends React.Component {
  static defaultProps = {
    bgColor: 'darkcyan',
    borderStyle: ''
  }
  render() {
    // const value = this.props
    // const bgColor = typeof this.props.bgColor !== 'undefined' ? this.props.bgColor : 'darkcyan'
    // const borderStyle = typeof this.props.borderStyle !== 'undefined' ? this.props.borderStyle : ''

    return (
      <div
        style={{
          margin: '5px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          lineHeight: '100px',
          background: this.props.bgColor,
          borderStyle: this.props.borderStyle
        }}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    )
  }
}