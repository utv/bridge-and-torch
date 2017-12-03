import React from 'react'

export default class Circle extends React.Component {
  render() {
    return (
      <div style={{
        margin:'5px',
        width:'100px',
        height:'100px',
        borderRadius:'50%',
        background:'crimson',
        lineHeight:'100px'
      }}>
        {this.props.children}
      </div>
    )
  }
}