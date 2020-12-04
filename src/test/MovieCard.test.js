import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from '../components/MovieCard';

describe('MovieCard Component', () => {

  it('should render correctly', () => {
    render(<MovieCard 
      id={1}
      title={'Inside out'}
      avgRating={10}
      releaseDate={'2018-06-24'}
      posterImg={'https://123.test'}
      handleClick={jest.fn()}
    />)

    //screen.debug()
    const movieTitle = screen.getByText('Inside out');
    //const movieReleaseDate= screen.getAllByText('Release Date: 2018-06-24');
    const moviePoster = screen.getByRole('img');

    expect(movieTitle).toBeInTheDocument()
    //expect(movieReleaseDate).toBeInTheDocument()
    expect(moviePoster).toBeInTheDocument()
  })

  it('should render with correct id', () => {
    const mockClick = jest.fn()

    render(<MovieCard 
      id={2}
      title={'Coco'}
      avgRating={10}
      releaseDate={'2018-01-02'}
      posterImg={'https://456.test'}
      handleClick={mockClick}
    />)

    fireEvent.click(screen.getByRole('heading'))

    expect(mockClick).toHaveBeenCalledWith(2)
  })

})