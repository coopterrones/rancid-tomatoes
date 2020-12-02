import React, { Component } from 'react';
import './App.css';
import movieData from './components/movieData';
import Movies from './components/Movies'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: movieData.movies
    }
  }

  render() {
    return (
      <main className='App'>
        <Movies movies={this.state.movies}/>
      </main>
    )
  }
}

export default App;
