import React from 'react';
import '../styles/MovieCard.scss';
import { Link } from 'react-router-dom';

const MovieCard = (props) => {
  const {id, title, avgRating, releaseDate, posterImg} = props;
  return (
    <Link to={`/movie/${id}`} className='movie-card'>
      <section data-testid={`movie-card-${id}`} id={id}>
        <section>
          <img src={posterImg} className='poster-img' alt={title}/>
        </section>
        <section>
          <h3>{title}</h3>
          <p>Rating: {avgRating}</p>
          <p>Release Date: {releaseDate}</p>
        </section>
      </section>
    </Link>
  )
}

export default MovieCard;
