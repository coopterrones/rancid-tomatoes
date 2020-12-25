import React from 'react';
import '../styles/Movies.scss';

const Movies = ({ children }) => {
  return <section className='movies-container'>{children}</section>;
};

export default Movies;
