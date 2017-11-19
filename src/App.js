import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Middle from './Middle'
import WeightList from './WeightList'

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
      // weights: [5, 10, 12]
      weights: [5, 10, 12, 8, 500, 10, 12, 8]
    }
  }

  renderMiddlePanel() {
    const readyButton = this.state.weights.length > 0
      ? <button>Ready</button>
      : null
    return (
      <div className='middle'>
        <div className='middle-item'>
          {readyButton}
        </div>
      </div>
    )
  }

  test() {
    return (
      <ul className='side left'>
        <WeightList
          items={this.state.weights.filter((val) => val > 0)}
        />
      </ul>
    )
  }

  ulWithinDiv(side) {
    return (
      <div style={{ display: 'inline-block' }}>
        <ul className={'side ' + side}>
          <WeightList
            items={this.state.weights.filter((val) => val > 0)}
          />
        </ul>
      </div>
    )
  }

  ulOnly(side) {
    return (
      <ul className={'side ' + side}>
        <WeightList
          items={this.state.weights.filter((val) => val > 0)}
        />
      </ul>
    )
  }

  renderTable(side) {
    const NUM_COLUMNS = 3
    const rows = this.state.weights.reduce((acc, val, idx) => {
      const td = (
        <td>
          <div className='circle'>
            {val > 0 ? val : val * -1}
          </div>
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
        {rows.map((row, rid) => <tr key={rid}>{row}</tr>)}
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
          {/* this.ulWithinDiv('left') */}
          {/* this.ulOnly('left') */}
          {this.renderTable('left')}
          {this.renderMiddlePanel()}
          {this.renderTable('right')}
          {/* this.ulWithinDiv('right') */}
          {/* this.ulOnly('right') */}
        </div>
      </div>
    );
  }
}

export default App;
