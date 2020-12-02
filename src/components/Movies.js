import React from 'react';
import MovieCard from './MovieCard';
import '../styles/Movie.scss';

const Movies = ({movies, handleClick}) => {
  const movieCards = movies.map((movie) => {
    return (
      <MovieCard
        id={movie.id}
        title={movie.title}
        avgRating={movie.average_rating.toFixed(1)}
        releaseDate={movie.release_date}
        posterImg={movie.poster_path}
        key={movie.id}
        handleClick={handleClick}
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
