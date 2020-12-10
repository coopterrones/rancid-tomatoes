import React, { Component } from 'react';
import './App.css';
import Movies from './components/Movies';
import ChosenMovie from './components/ChosenMovie';
import {apiCalls} from './apiCalls';
import { Route } from 'react-router-dom';
import Loading from './components/Loading';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      error: '',
      loaded: false
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    apiCalls.allMovies()
    .then(data => {
        this.setState({
          movies: data.movies,
          loaded: true
        })
      })
    .catch(err => this.setState({
      error: err.message
    }))
  }

  render() {
    return (
      <main className='App'>
        {this.state.error && <p>{this.state.error}</p>}
        {!this.state.loaded && <Loading/> }

        <Route path='/' exact render={ () =>
          <Movies movies={this.state.movies} />
        }
        />
        
        <Route path='/movie/:id' component={ ChosenMovie } /> 
      </main>
    )
  }
}

export default App;
