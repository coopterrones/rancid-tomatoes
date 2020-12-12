import React from 'react';
import MovieCard from './MovieCard';
import '../styles/Movies.scss';

const Movies = ({ movies, addToWatchList, removeFromWatchList }) => {
  const movieCards = movies.map((movie) => {
    const date = new Date(movie.release_date);
    const formattedDate = date.toDateString().split(' ');
    return (
      <MovieCard
        movie={movie}
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
    <section className='movies-container'>
      {movieCards}
    </section>
  )
}

export default Movies;
