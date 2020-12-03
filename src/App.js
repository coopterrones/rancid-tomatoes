import React, { Component } from 'react';
import './App.css';
import movieData from './components/movieData';
import Movies from './components/Movies';
import ChosenMovie from './components/ChosenMovie';
import {apiCalls} from './apiCalls';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      chosenMovie: null
    }
  }

  componentDidMount() {
    apiCalls.allMovies()
      .then(data => {
          this.setState({
              movies: data.movies
          })
      })
  }

  handleClick = (id) => {
    apiCalls.selectMovie(id)
      .then(data => {
          this.setState({
            chosenMovie: data.movie
          })
      })
    }

  displayAllMovies = (event) => {
    event.preventDefault();
    this.setState({
      chosenMovie: null
    })
  }

  render() {
    return (
      <main className='App'>
        {this.state.chosenMovie &&
          <ChosenMovie
            movie={this.state.chosenMovie}
            displayAllMovies={this.displayAllMovies}
          />}
        {!this.state.chosenMovie &&
          <Movies
            movies={this.state.movies}
            handleClick={this.handleClick}
          />
        }
      </main>
    )
  }
}

export default App;
