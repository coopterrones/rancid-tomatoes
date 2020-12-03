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
      chosenMovie: null,
      chosenVideo: null
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
    Promise.all([apiCalls.selectMovie(id), apiCalls.selectVideo(id)])
      .then(data => {
        console.log(data)
        const chosenMovie = data.reduce((chosenMovieData, eachDataset) => {
          return chosenMovieData = {...chosenMovieData, ...eachDataset}
        }, {});
      this.setState({
        chosenMovie: chosenMovie.movie,
        chosenVideo: chosenMovie.videos[0]
      })

    // apiCalls.selectMovie(id)
    //   .then(data => {
    //       this.setState({
    //         chosenMovie: data.movie
    //       })
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
