import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Side from './Side'
import Middle from './Middle'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bridge And Torch</h1>
        </header>
        <div className='wrapper'>
          <Side left={true} />
          <Middle />
          <Side />
        </div>
      </div>
    );
  }
}

export default App;
