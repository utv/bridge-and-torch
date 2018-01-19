import React from 'react'
import './App.css'

export default class WeightList extends React.Component {

  render() {
    if (this.props.weights.length === 0) return null
    const radius = '15px'
    const tableStyle = typeof this.props.side === 'undefined'
      ? {}
      : this.props.side === 'L'
        ? {
          borderTopLeftRadius: radius,
          borderBottomLeftRadius: radius
        }
        : {
          borderTopRightRadius: radius,
          borderBottomRightRadius: radius
        }
    const NUM_COLUMNS = 3
    const rows = this.props.weights.reduce((acc, val, idx) => {
      const td = (
        <td key={idx}>
          {this.props.render(val, this.props.side)}
        </td>
      )

      if (idx % NUM_COLUMNS !== 0) {
        const row = acc.pop()
        row.push(td)
        acc.push(row)
      } else {
        acc.push([td])
      }
      return acc
    }, [[]])

    console.log('rows', rows)
    return (
      <table style={tableStyle}>
        <tbody>
          {rows.map((row, rid) => <tr key={rid}>{row}</tr>)}
        </tbody>
      </table>
    )
  }

}