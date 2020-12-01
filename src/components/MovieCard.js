import React from 'react';

const MovieCard = ({title, avgRating, releaseDate, posterImg}) => {
  return (
    <div className='movie-card'>
      <img src={posterImg}/>
      <h3>{title}</h3>
      <p>{avgRating}</p>
      <p>{releaseDate}</p>
    </div>
  )
}

export default MovieCard;
