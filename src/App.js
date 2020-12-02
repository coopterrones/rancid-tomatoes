import React, { Component } from 'react';
import './App.css';
import movieData from './components/movieData';
import Movies from './components/Movies';
import ChosenMovie from './components/ChosenMovie';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: movieData.movies,
      chosenMovie: null
    }
  }

  handleClick = (id) => {
    const chosenMovie = this.state.movies.find(movie => movie.id === id)
    this.setState({
      chosenMovie: chosenMovie
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
