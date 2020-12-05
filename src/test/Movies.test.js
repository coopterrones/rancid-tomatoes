import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Movies from '../components/Movies';

describe('Movies Component', () => {
  it('should render correctly', () => {
    render(
      <Movies
        movies={[
        {
          id: 694919,
          title:"Money Plane",
          release_date:"2020-09-29",
          poster_path:"https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
          average_rating:7
        },
        {
          id: 694456,
          title:"Elle's Money Plane",
          release_date:"2020-10-31",
          poster_path:"https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
          average_rating:10
        }
        ]}
      />
    )

    const title1 = screen.getByText('Money Plane');
    const releaseDate1 = screen.getByText('Release Date: 2020-09-29');
    const averageRating1 = screen.getByText('Rating: 10.0');
    const posterImages = screen.getAllByRole('img');

    expect(title1).toBeInTheDocument();
    expect(releaseDate1).toBeInTheDocument();
    expect(averageRating1).toBeInTheDocument();
    expect(posterImages).toHaveLength(2);

  })
})
