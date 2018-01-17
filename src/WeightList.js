import React from 'react'
import './App.css'

export default class WeightList extends React.Component {
  /* renderCircle() {
    return (
      <Circle
        bgColor={this.LEFT === side ? 'crimson' : 'darkcyan'}
        weight={value}
      >
        {value}
      </Circle>
    )
  } */

  renderTable() {
    if (this.props.weights.length === 0) return null
    const NUM_COLUMNS = 3
    /* const theWeights = side === this.LEFT
    ? this.state.weights.filter((w) => w > 0)
    : this.state.weights.filter((w) => w < 0) */
    const rows = this.props.weights.reduce((acc, val, idx) => {
      const td = (
        <td key={idx}>
          {this.props.render(val)}
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
      <table>
        <tbody>
          {rows.map((row, rid) => <tr key={rid}>{row}</tr>)}
        </tbody>
      </table>
    )
  }

  render() {
    /* if (typeof this.props.items === 'undefined') return null
    return this.props.items.map((val, idx) => (
      <li
        key={idx}
        className='side-item'
      >
        <div className='circle'>
          {val > 0 ? val : val * -1}
        </div>
      </li>
    )) */
    if (typeof this.props.weights === 'undefined') return null

    return (
      <table>
        <tbody>
          {this.renderTable()}
        </tbody>
      </table>
    )
  }
}