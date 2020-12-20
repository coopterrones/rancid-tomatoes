import React, { useState, useEffect } from 'react';
import './App.css';
import Movies from './components/Movies';
import ChosenMovie from './components/ChosenMovie';
import { apiCalls } from './apiCalls';
import { Route } from 'react-router-dom';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import Error from './components/Error';
import WatchList from './components/WatchList';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [queries, setqueries] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [error, setError] = useState('');
  const [sorted, updateSorted] = useState(false);
  const [loaded, updateloaded] = useState(false);
  const displayMovies = queries.length ? queries : movies;

  useEffect(() => getData(), [])

  const getData = () => {
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
        setMovies(updateMovies);
        setWatchList(newDataSet.watchListIds);
        updateloaded(true)
      })
      .catch(err => setError(err.message))
  }

  const sortMovies = () => {
    let moviesList = queries.length ? [...queries] : [...movies];
    if (sorted) {
      moviesList.sort((a, b) => {
        return new Date(a.release_date) - new Date(b.release_date)
      })
    } else {
      moviesList.sort((b, a) => {
        return new Date(a.release_date) - new Date(b.release_date)
      })
    }
    if (queries.length) {
      setqueries(moviesList);
      updateSorted(prevSortState => !prevSortState)
    } else {
      setMovies(moviesList);
      updateSorted(prevSortState => !prevSortState)
    }
  }

  const getSearchedMovies = (queriedMovies) => {
    setqueries(queriedMovies)
  }

  const addToWatchList = (id) => {
    apiCalls.addToWatchList(id)
      .then(() => updateWatchStatus(id))
      .catch(err => setError(err.message))
  }

  const removeFromWatchList = (id) => {
    apiCalls.removeFromWatchList(id)
      .then(() => updateWatchStatus(id))
      .catch(err => setError(err.message))
  }

  const updateWatchStatus = (id) => {
    const allMovies = [...movies]
    const updateMovies = allMovies.map(movie => {
      if (movie.id === id) {
        return { ...movie, onWatchList: !movie.onWatchList }
      } else {
        return movie
      }
    })
    apiCalls.getWatchList()
      .then(data => {
        setMovies(updateMovies);
        setWatchList(data.watchListIds);
      })
  }

  const getWatchList = () => {
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



  return (
    <main className='App'>
      {error && <Error />}
      {!loaded && <Loading />}

      <Route path='/' exact
        render={() =>
          <Navigation
            movies={displayMovies}
            getSearchedMovies={getSearchedMovies}
            sortMovies={sortMovies}
            sortStatus={sorted}
          />
        } />

      <Route path='/' exact
        render={() =>
          <Movies
            movies={displayMovies}
            addToWatchList={addToWatchList}
            removeFromWatchList={removeFromWatchList}
          />
        } />

      <Route path='/movie/:id' component={ChosenMovie} />
      <Route path='/watch-list'
        render={() =>
          <WatchList
            watchListMovies={getWatchList}
            addToWatchList={addToWatchList}
            removeFromWatchList={removeFromWatchList}
          />
        }
      />
    </main>
  )

}

export default App;

