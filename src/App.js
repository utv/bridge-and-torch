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
    this.colors = {
      NONE_EMPTY: 'crimson',
      EMPTY: 'darkcyan'
    }
    this.LEFT = 'L'
    this.RIGHT = 'R'
    this.MAX_SELECTIONS = 2
    /* 
    Example
      weights: [5, 10, 12] 
        --> All on the left side
      weights: [-5, -10, 12] 
        --> 5 and 10 have crossed the bridge, costs 10(Max btw 5,10)
    */
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

  moveWeights(weights) {
    // move each weight by multiplying -1
    return weights.map((w, wIdx) => {
      if (this.state.selectedWeightIndices.includes(wIdx))
        return w * -1
      return w
    })
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
      && this.state.selectedWeightIndices.length > 0
    )
      this.setState((prevState) => ({
        weights: this.moveWeights(prevState.weights),
        inputWeight: '',
        buttonCaption: '<==',
        selectedWeightIndices: [],
        gameState: this.gameStates.PLAYING_R2L
      }))

    else if (
      this.state.gameState === this.gameStates.PLAYING_R2L
      && this.state.selectedWeightIndices.length > 0
    )
      this.setState((prevState) => ({
        weights: this.moveWeights(prevState.weights),
        inputWeight: '',
        buttonCaption: '==>',
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
      ?
      (
        <input
          className='weight-input'
          value={this.state.inputWeight}
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          autoFocus
        />
      )
      :
      (
        <button
          onClick={
            this.state.selectedWeightIndices.length > 0
              ? this.onMiddleButtonClick.bind(this)
              : () => { }
          }
        >
          {this.state.buttonCaption}
        </button>
      )
    const startButton = this.state.gameState === this.gameStates.PREPARING
      ?
      (
        <button onClick={this.onMiddleButtonClick.bind(this)} >
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

  cancelSelection(weightIndex) {
    this.setState((prevState) => {
      return {
        selectedWeightIndices:
          prevState.selectedWeightIndices.filter((wIndex) => wIndex !== weightIndex)
      }
    })
  }

  addToSelection(weightIndex) {
    const { selectedWeightIndices } = this.state
    // remove last selctions and add new one
    if (selectedWeightIndices.length === this.MAX_SELECTIONS)
      this.setState((prevState) => {
        const len = prevState.selectedWeightIndices.length
        let newSelections = prevState.selectedWeightIndices.slice(0, len - 1)
        newSelections.concat(weightIndex)
        return {
          selectedWeightIndices: newSelections.concat(weightIndex)
        }
      })
    else
      this.setState((prevState) => {
        return {
          selectedWeightIndices:
            prevState.selectedWeightIndices.concat(weightIndex)
        }
      })
  }

  onRightWeightClick(weightIndex, e) {
    if (this.state.gameState !== this.gameStates.PLAYING_R2L || weightIndex === null)
      return

    if (!this.isRightSelected(weightIndex))
      this.addToSelection(weightIndex)
    else
      this.cancelSelection(weightIndex)
  }

  onLeftWeightClick(weightIndex, e) {
    if (this.state.gameState !== this.gameStates.PLAYING_L2R || weightIndex === null)
      return

    if (!this.isLeftSelected(weightIndex))
      this.addToSelection(weightIndex)
    else
      this.cancelSelection(weightIndex)
  }

  isLeftSelected(weightIndex) {
    const { gameState } = this.state
    return (
      gameState === this.gameStates.PLAYING_L2R
      && this.state.selectedWeightIndices.includes(weightIndex)
    )
  }

  isRightSelected(weightIndex) {
    const { gameState } = this.state
    return (
      gameState === this.gameStates.PLAYING_R2L
      && this.state.selectedWeightIndices.includes(weightIndex)
    )
  }

  renderLeftWeightList() {
    // Indices of weights on the left
    const weightIndices = this.state.weights.map((w, index) => {
      if (w > 0) return index
      return null
    }).filter((wIndex) => wIndex !== null)

    // add nulls to an array of indices for rendering empty column on table(WeightList)
    const emptyWeightIndices =
      new Array(this.state.weights.length - weightIndices.length).fill(null)
    const totalWeightIndices = weightIndices.concat(emptyWeightIndices)
    const radius = '15px'

    // WeightList on the left and right are tables with the same number of row&column
    // Because of adding
    return (
      <WeightList
        weights={this.state.weights}
        weightIndices={totalWeightIndices}
        tableStyle={{
          borderTopLeftRadius: radius,
          borderBottomLeftRadius: radius
        }}
        // side={side}
        render={(weightIndex, weight) =>
          <Circle
            backgroundColor={
              weight !== undefined && weight > 0
                ? this.colors.NONE_EMPTY
                : this.colors.EMPTY
            }
            selected={weight !== undefined && this.isLeftSelected(weightIndex)}
            onClick={this.onLeftWeightClick.bind(this, weightIndex)}
          >
            {
              weight !== undefined && weight > 0
                ? weight
                : ''
            }
          </Circle>
        }
      />
    )
  }

  renderRightWeightList() {
    // Indices of weights on the right
    const weightIndices = this.state.weights.map((w, index) => {
      if (w < 0) return index
      return null
    }).filter((wIndex) => wIndex !== null)

    // add nulls to an array of indices for rendering empty column on table(WeightList)
    const emptyWeightIndices =
      new Array(this.state.weights.length - weightIndices.length).fill(null)
    const totalWeightIndices = weightIndices.concat(emptyWeightIndices)
    const radius = '15px'

    return (
      <WeightList
        weights={this.state.weights}
        weightIndices={totalWeightIndices}
        tableStyle={{
          borderTopRightRadius: radius,
          borderBottomRightRadius: radius
        }}
        render={(weightIndex, weight) =>
          <Circle
            backgroundColor={
              weight !== undefined && weight < 0
                ? this.colors.NONE_EMPTY
                : this.colors.EMPTY
            }
            selected={weight !== undefined && this.isRightSelected(weightIndex)}
            onClick={this.onRightWeightClick.bind(this, weightIndex)}
          >
            {
              weight !== undefined && weight < 0
                ? weight * -1
                : ''
            }
          </Circle>
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
          {this.renderLeftWeightList()}
          {this.renderMiddlePanel()}
          {this.renderRightWeightList()}
        </div>
      </div>
    );
  }
}

export default App;
