import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Side from './Side'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className='wrapper'>
          <ul className='side left'>
            <li className='side-item'>
              <div className='circle'></div>
            </li>
            <li className='side-item'>
              <div className='circle'></div>
            </li>
            <li className='side-item'>
              <div className='circle'></div>
            </li>
          </ul>
          <ul className='side left'>
            <li className='side-item'>
              <div className='circle'></div>
            </li>
            <li className='side-item'>
              <div className='circle'></div>
            </li>
            <li className='side-item'>
              <div className='circle'></div>
            </li>
          </ul>
          <div className='middle'>
            <div className='middle-item'></div>
            <div className='middle-item'></div>
            <div className='middle-item'></div>
          </div>
          <ul className='side right'>
            <li className='side-item'>1</li>
            <li className='side-item'>2</li>
            <li className='side-item'>3</li>
          </ul>
          <ul className='side right'>
            <li className='side-item'>1</li>
            <li className='side-item'>2</li>
            <li className='side-item'>3</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
