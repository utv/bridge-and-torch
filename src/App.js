import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import WeightList from './WeightList'
import Circle from './Circle'

class App extends Component {
  constructor(props) {
    super(props)
    this.gameState = {
      PREPARING: 0,
      PLAYING: 1,
      DONE: 2
    }
    this.state = {
      currentState: this.gameState.PREPARING,
      weights: [],
      inputWeight: ''
      // weights: [5, 10, 12]
      // weights: [5, 10, 12, 8, 500, 10, 12, 8]
    }
  }

  handleKeyPress(e) {
    if (e.key !== 'Enter') return
    const val = e.target.value
    this.setState((prevState) => ({
      weights: prevState.weights.concat(val),
      inputWeight: ''
    }))
  }

  handleChange(e) {
    this.setState({
      inputWeight: e.target.value
    })
  }

  renderMiddlePanel() {
    const readyButton = this.state.weights.length > 0
      ? <button>Ready</button>
      : null
    return (
      <div className='middle'>
        <div>
          <Circle>
            <input
              className='weight-input'
              value={this.state.inputWeight}
              onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)}
              autoFocus />
          </Circle>
          {readyButton}
        </div>
      </div>
    )
  }

  renderTable(side) {
    if (this.state.weights.length === 0) return
    const NUM_COLUMNS = 3
    const rows = this.state.weights.reduce((acc, val, idx) => {
      const td = (
        <td key={idx}>
          <Circle>
            {val > 0 ? val : val * -1}
          </Circle>
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
      <table>
        <tbody>
          {rows.map((row, rid) => <tr key={rid}>{row}</tr>)}
        </tbody>
      </table>
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bridge And Torch</h1>
        </header>
        <div className='wrapper'>
          {this.renderTable('left')}
          {this.renderMiddlePanel()}
          {this.renderTable('right')}
        </div>
      </div>
    );
  }
}

export default App;
