import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import WeightList from './WeightList'
import Circle from './Circle'
import CirCleContainer from './CirCleContainer'

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
      selectedWeightIndices: [],
      buttonCaption: 'Ready'
      // weights: [5, 10, 12]
      // weights: [5, 10, 12, 8, 500, 10, 12, 8]
    }
  }

  handleKeyPress(e) {
    if (e.key !== 'Enter') return
    const val = e.target.value * 1
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

  isDone() {
    return false
  }

  onMiddleButtonClick(e) {
    e.preventDefault()
    if (this.state.gameState === this.gameStates.PREPARING)
      this.setState({
        inputWeight: '',
        buttonCaption: '==>',
        selectedWeightIndices: [],
        gameState: this.gameStates.PLAYING_L2R
      })

    else if (
      this.state.gameState === this.gameStates.PLAYING_L2R
    )
      this.setState((prevState) => ({
        weights: this.moveL2R(prevState.weights),
        inputWeight: '',
        selectedWeightIndices: []
      }))

    else if (
      this.state.gameState === this.gameStates.PLAYING_R2L
    )
      this.setState((prevState) => ({
        weights: this.moveR2L(prevState.weights),
        inputWeight: '',
        buttonCaption: '<==',
        selectedWeightIndices: [],
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
    const middleInputElement = this.state.gameState === this.gameStates.PREPARING
      ? (
        <input
          className='weight-input'
          value={this.state.inputWeight}
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          autoFocus
        />
      )
      : (
        <button onClick={this.onMiddleButtonClick.bind(this)}>
          {this.state.buttonCaption}
        </button>
      )
    const startButton = this.state.gameState === this.gameStates.PREPARING
      ? (
        < button onClick={this.onMiddleButtonClick.bind(this)} >
          {this.state.buttonCaption}
        </button>
      )
      : null
    return (
      <div className='middle'>
        <div>
          <Circle>
            {middleInputElement}
          </Circle>
          {startButton}
        </div>
      </div>
    )
  }

  onCirCleClick(clickedWeightIndex, side, e) {

    const { gameState, weights } = this.state
    const isClickedOnLeftValid =
      (
        side === 'L'
        && gameState === this.gameStates.PLAYING_L2R
        && weights[clickedWeightIndex] > 0
      )
    const isClickedOnRightValid =
      (
        side === 'R'
        && gameState === this.gameStates.PLAYING_R2L
        && weights[clickedWeightIndex] < 0
      )

    if (isClickedOnLeftValid || isClickedOnRightValid)
      this.setState((prevState) => {

        return {
          selectedWeightIndices:
            prevState.selectedWeightIndices.concat(clickedWeightIndex)
        }
      })
  }

  isSelected(weightIndex, side) {

    if (
      side === 'L'
      && this.state.gameState === this.gameStates.PLAYING_L2R
      && this.state.weights[weightIndex] > 0
      && this.state.selectedWeightIndices.includes(weightIndex)
    )
      return true

    if (
      side === 'R'
      && this.state.gameState === this.gameStates.PLAYING_R2L
      && this.state.weights[weightIndex] < 0
      && this.state.selectedWeightIndices.includes(weightIndex)
    )
      return true

    return false
  }

  renderWeightList(side) {
    return (
      <WeightList
        weights={this.state.weights}
        side={side}
        render={(weightIndex, weight, side) =>
          <CirCleContainer
            weight={weight}
            side={side}
            selected={this.isSelected(weightIndex, side)}
            onClick={this.onCirCleClick.bind(this, weightIndex, side)}
          />
        }
      />
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
          {this.renderWeightList('L')}
          {this.renderMiddlePanel()}
          {this.renderWeightList('R')}
        </div>
      </div>
    );
  }
}

export default App;
