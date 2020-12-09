import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from '../components/MovieCard';
import { MemoryRouter} from 'react-router-dom';

describe('MovieCard Component', () => {

  it('should render correctly', () => {
    render(<MovieCard 
      id={1}
      title={'Inside out'}
      avgRating={10}
      releaseDate={'2018-06-24'}
      posterImg={'https://123.test'}
    />, {wrapper: MemoryRouter})
    
    const movieTitle = screen.getByText(/Inside out/i);
    const movieReleaseDate= screen.getByText(/Release Date: 2018-06-24/i);
    const moviePoster = screen.getByRole(/img/i);

    expect(movieTitle).toBeInTheDocument()
    expect(movieReleaseDate).toBeInTheDocument()
    expect(moviePoster).toBeInTheDocument()
  })

})