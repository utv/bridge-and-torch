import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Side from './Side'
import Middle from './Middle'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      weights: []
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bridge And Torch</h1>
        </header>
        <div className='wrapper'>
          <Side
            left={true}
            {...this.state.weights}
          />
          {this.renderMiddlePanel()}
          <Side
            left={false}
            {...this.state.weights}
          />
        </div>
      </div>
    );
  }
}

export default App;
