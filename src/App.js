import React, { Component } from 'react';
import './App.css';
import Movies from './components/Movies';
import ChosenMovie from './components/ChosenMovie';
import {apiCalls} from './apiCalls';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      chosenMovie: null,
      chosenVideo: null,
      error: ''
    }
  }

  componentDidMount() {
    apiCalls.allMovies()
      .then(data => {
          this.setState({
            movies: data.movies
          })
        })
      .catch(err => this.setState({
        error: err
      }))
  }

  handleClick = (id) => {
    Promise.all([apiCalls.selectMovie(id), apiCalls.selectVideo(id)])
      .then(data => {
        const chosenMovie = data.reduce((chosenMovieData, eachDataset) => {
          return chosenMovieData = {...chosenMovieData, ...eachDataset}
        }, {});
      this.setState({
        chosenMovie: chosenMovie.movie,
        chosenVideo: chosenMovie.videos[0]
      })
    })
  }

  animation = (id) => {
    
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
        {this.state.error &&
        <p>Sorry the page is not valid, please try again!</p>}
        {this.state.chosenMovie &&
          <ChosenMovie
            movie={this.state.chosenMovie}
            video={this.state.chosenVideo}
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
