import React from 'react';
import '../styles/MovieCard.scss';

const MovieCard = (props) => {
  const {id, title, avgRating, releaseDate, posterImg, handleClick} = props;

  return (
    <section className='movie-card'id={id} onClick={() => {handleClick(id)}}>
      <section>
        <img src={posterImg} className='poster-img' alt={title}/>
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
