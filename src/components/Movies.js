import React from 'react';
import MovieCard from './MovieCard';
import '../styles/Movie.scss';

const Movies = ({movies}) => {
  const movieCards = movies.map((movie) => {
    return (
      <MovieCard
        id={movie.id}
        title={movie.title}
        avgRating={movie.average_rating.toFixed(1)}
        releaseDate={movie.release_date}
        posterImg={movie.poster_path}
        key={movie.id}
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
