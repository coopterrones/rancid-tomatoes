import React from 'react';
import MovieCard from './MovieCard';
import '../styles/WatchList.scss';
import { Link } from 'react-router-dom';
import backButton from '../assets/back-button.svg';

const WatchList = ({ watchListMovies, addToWatchList, removeFromWatchList }) => {
  const watchList = watchListMovies();
  const watchListMovieCards = watchList.map((movie) => {
    const date = new Date(movie.release_date);
    const formattedDate = date.toDateString().split(' ');
    return (
      <MovieCard
        id={movie.id}
        title={movie.title}
        avgRating={movie.average_rating.toFixed(1)}
        releaseDate={formattedDate}
        posterImg={movie.poster_path}
        onWatchList={movie.onWatchList}
        key={movie.id}
        addToWatchList={addToWatchList}
        removeFromWatchList={removeFromWatchList}
      />
    )
  })

  return (
    <section className='watch-list-movies-container'>
      <Link to='/'>
        <img className="back-button-icon" src={backButton} alt='back-button-icon' />
      </Link>
      {watchList.length ?
        watchListMovieCards : <p className='watch-list-empty-prompt'>No movies in your watch list. Please add to list!</p>}
    </section>
  )

}

export default WatchList;