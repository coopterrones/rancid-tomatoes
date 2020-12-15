import React, { Component } from 'react';
import './App.css';
import Movies from './components/Movies';
import ChosenMovie from './components/ChosenMovie';
import { apiCalls } from './apiCalls';
import { Route } from 'react-router-dom';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import Error from './components/Error';
import WatchList from './components/WatchList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      queries: [],
      watchList: [],
      sorted: false,
      error: '',
      loaded: false
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    let updateMovies;
    Promise.all([apiCalls.allMovies(), apiCalls.getWatchList()])
      .then(data => {
        const newDataSet = data.reduce((allData, dataSet) => {
          return allData = { ...allData, ...dataSet }
        }, {})
        if (newDataSet.watchListIds.length) {
          updateMovies = newDataSet.movies.map(movie => {
            if (newDataSet.watchListIds.includes(movie.id)) {
              return { ...movie, onWatchList: true }
            } else {
              return { ...movie, onWatchList: false }
            }
          })
        } else {
          updateMovies = newDataSet.movies.map(movie => {
            return { ...movie, onWatchList: false }
          })
        }
        this.setState({
          movies: updateMovies,
          watchList: newDataSet.watchListIds,
          loaded: true
        })
      })
      .catch(err => this.setState({
        error: err.message
      }))
  }

  sortMovies = () => {
    let moviesList = this.state.queries.length ? [...this.state.queries] : [...this.state.movies];
    if (this.state.sorted) {
      moviesList.sort((a, b) => {
        return new Date(a.release_date) - new Date(b.release_date)
      })
    } else {
      moviesList.sort((b, a) => {
        return new Date(a.release_date) - new Date(b.release_date)
      })
    }
    if (this.state.queries.length) {
      this.setState((prevState) => {
        return { queries: moviesList, sorted: !prevState.sorted }
      })
    } else {
      this.setState((prevState) => {
        return { movies: moviesList, sorted: !prevState.sorted }
      })
    }
  }

  getSearchedMovies = (queriedMovies) => {
    this.setState({
      queries: queriedMovies
    })
  }

  addToWatchList = (id) => {
    apiCalls.addToWatchList(id)
      .then(() => this.updateWatchStatus(id))
      .catch(err => this.setState({
        error: err.message
      }))
  }

  removeFromWatchList = (id) => {
    apiCalls.removeFromWatchList(id)
      .then(() => this.updateWatchStatus(id))
      .catch(err => this.setState({
        error: err.message
      }))
  }

  updateWatchStatus = (id) => {
    const movies = [...this.state.movies]
    const updateMovies = movies.map(movie => {
      if (movie.id === id) {
        return { ...movie, onWatchList: !movie.onWatchList }
      } else {
        return movie
      }
    })
    apiCalls.getWatchList()
      .then(data => {
        this.setState({
          movies: updateMovies,
          watchList: data.watchListIds
        })
      })
  }

  getWatchList = () => {
    const { movies, watchList } = this.state;
    const watchListMovies = watchList.reduce((moviesOnList, watchListId) => {
      movies.forEach(movie => {
        if (movie.id === watchListId) {
          moviesOnList.push(movie);
        }
      })
      return moviesOnList;
    }, [])
    return watchListMovies;
  }

  render() {
    const { movies, queries, sorted, error, loaded } = this.state;
    const displayMovies = queries.length ? queries : movies;
    return (
      <main className='App'>
        {error && <Error />}
        {!loaded && <Loading />}

        <Route path='/' exact
          render={() =>
            <Navigation
              movies={displayMovies}
              getSearchedMovies={this.getSearchedMovies}
              sortMovies={this.sortMovies}
              sortStatus={sorted}
            />
          } />

        <Route path='/' exact
          render={() =>
            <Movies
              movies={displayMovies}
              addToWatchList={this.addToWatchList}
              removeFromWatchList={this.removeFromWatchList}
            />
          } />

        <Route path='/movie/:id' component={ChosenMovie} />
        <Route path='/watch-list'
          render={() =>
            <WatchList
              watchListMovies={this.getWatchList}
              addToWatchList={this.addToWatchList}
              removeFromWatchList={this.removeFromWatchList}
            />
          }
        />
      </main>
    )
  }
}

export default App;

