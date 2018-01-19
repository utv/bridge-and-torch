import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import WeightList from './WeightList'
import Circle from './Circle'


class App extends Component {
  constructor(props) {
    super(props)
    this.gameStates = {
      PREPARING: 0,
      PLAYING_L2R: 1,
      PLAYING_R2L: 2,
      DONE: 3
    }
    this.LEFT = 'L'
    this.RIGHT = 'R'
    this.state = {
      gameState: this.gameStates.PREPARING,
      weights: [],
      inputWeight: '',
      selectedWeights: [],
      buttonCaption: ''
      // weights: [5, 10, 12]
      // weights: [5, 10, 12, 8, 500, 10, 12, 8]
    }
  }

  getButtonCaption() {
    return ''
  }

  handleKeyPress(e) {
    if (e.key !== 'Enter') return
    const val = e.target.value
    this.setState((prevState) => ({
      weights: prevState.weights.concat(val),
      inputWeight: '',
      buttonCaption: this.getButtonCaption()
    }))
  }

  handleChange(e) {
    this.setState({
      inputWeight: e.target.value
    })
  }

  isDone() {
    return false
  }

  onMiddleButtonClick(e) {
    e.preventDefault()
    if (this.state.gameState === this.gameStates.PREPARING)
      this.setState((prevSate) => ({
        inputWeight: '',
        buttonCaption: '==>',
        selectedWeights: [],
        gameState: this.gameStates.PLAYING_L2R
      }))

    else if (
      this.state.gameState === this.gameStates.PLAYING_L2R
    )
      this.setState((prevState) => ({
        weights: this.moveL2R(prevState.weights),
        inputWeight: '',
        selectedWeights: []
      }))

    else if (
      this.state.gameState === this.gameStates.PLAYING_R2L
    )
      this.setState((prevState) => ({
        weights: this.moveR2L(prevState.weights),
        inputWeight: '',
        buttonCaption: '<==',
        selectedWeights: [],
        gameState: this.gameStates.PLAYING_L2R
      }))
  }

  renderMiddleButton() {
    if (this.state.weights.length === 0) return null
    return (
      <button onClick={this.onMiddleButtonClick.bind(this)}>
        {this.state.buttonCaption}
      </button>
    )
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

  render() {
    const bgColor = (weight, side) => weight > 0 && side === 'L'
      ? 'crimson'
      : 'darkcyan'

    const renderCircle = (weight, side) => {
      if (weight > 0 && side === 'L')
        return <Circle bgColor='crimson'>{weight}</Circle>
      else if (weight < 0 && side === 'L')
        return <Circle bgColor='darkcyan'></Circle>
      if (weight < 0 && side === 'R')
        return <Circle bgColor='crimson'>{weight}</Circle>
      return <Circle bgColor='darkcyan'></Circle>
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bridge And Torch</h1>
        </header>
        <div className='wrapper'>
          <WeightList
            weights={this.state.weights}
            side="L"
            render={(weight, side) => renderCircle(weight, side)}
          />
          {this.renderMiddlePanel()}
          <WeightList
            weights={this.state.weights}
            side="R"
            render={(weight, side) => renderCircle(weight, side)}
          />
        </div>
      </div>
    );
  }
}

export default App;
