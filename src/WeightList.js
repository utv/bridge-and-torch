import React from 'react'
import './App.css'

export default class WeightList extends React.Component {

  render() {
    if (this.props.weights.length === 0) return null
    // const radius = '15px'

    const NUM_COLUMNS = 3
    const rows = this.props.weightIndices.reduce((acc, wIndex, idx) => {
      const td = (
        <td key={idx}>
          {this.props.render(wIndex, this.props.weights[wIndex], this.props.side)}
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


    return (
      <table style={this.props.tableStyle}>
        <tbody>
          {rows.map((row, rid) => <tr key={rid}>{row}</tr>)}
        </tbody>
      </table>
    )
  }

}