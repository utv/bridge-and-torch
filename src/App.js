import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import WeightList from './WeightList'
import Circle from './Circle'

class App extends Component {
  constructor(props) {
    super(props)
    this.THE_GAME_STATES = {
      PREPARING: 0,
      PLAYING_L2R: 1,
      PLAYING_R2L: 2,
      DONE: 3
    }
    this.LEFT = 'L'
    this.RIGHT = 'R'
    this.state = {
      gameState: this.THE_GAME_STATES.PREPARING,
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

  onReadyButtonClick(e) {
    e.preventDefault()

    this.setState({ gameState: this.THE_GAME_STATES.PLAYING_L2R })
  }

  renderMiddleButton() {
    if (this.state.weights.length === 0) return null
    if (this.state.gameState === this.THE_GAME_STATES.PREPARING)
      return <button onClick={this.onReadyButtonClick.bind(this)}>Ready</button>
    if (this.state.gameState === this.THE_GAME_STATES.PLAYING_L2R)
      return <button>{'==>'}</button>
    if (this.state.gameState === this.THE_GAME_STATES.PLAYING_R2L)
      return <button>{'<=='}</button>
  }

  renderMiddlePanel() {
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
          {this.renderMiddleButton()}
        </div>
      </div>
    )
  }

  renderTable(side) {
    if (this.state.weights.length === 0) return
    const NUM_COLUMNS = 3
    /* const theWeights = side === this.LEFT
    ? this.state.weights.filter((w) => w > 0)
    : this.state.weights.filter((w) => w < 0) */
    const rows = this.state.weights.reduce((acc, val, idx) => {
      const value =
        val > 0 && side === this.LEFT
          ? val
          : val < 0 && side === this.RIGHT
            ? val * -1
            : ''
      const td = (
        <td key={idx}>
          <Circle
            bgColor={this.LEFT === side ? 'crimson' : 'darkcyan'}
            weight={value}
          >
            {value}
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
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bridge And Torch</h1>
        </header>
        <div className='wrapper'>
          {this.renderTable(this.LEFT)}
          {this.renderMiddlePanel()}
          {this.renderTable(this.RIGHT)}
        </div>
      </div>
    );
  }
}

export default App;
