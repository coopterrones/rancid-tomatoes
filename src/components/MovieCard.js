import React from 'react';
import '../styles/MovieCard.scss';

const MovieCard = ({title, avgRating, releaseDate, posterImg}) => {
  return (
    <section className='movie-card'>
      <section>
        <img src={posterImg} className='poster-img'/>
      </section>
      <section>
        <h3>{title}</h3>
        <p>Rating: {avgRating}</p>
        <p>Release Date: {releaseDate}</p>
      </section>
    </section>
  )
}

export default MovieCard;
