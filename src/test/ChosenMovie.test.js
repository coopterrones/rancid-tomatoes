import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChosenMovie from '../components/ChosenMovie';

describe('ChosenMovie Component', () => {
  it('should render correctly', () => {
    render(
      <ChosenMovie 
        movie={{
          id: 694919, 
          title:"Money Plane",
          poster_path:"https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
          backdrop_path:"https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg",
          release_date:"2020-09-29",
          overview:"A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.",
          genres:["Action"],
          budget:0,
          revenue:0,
          runtime:82,
          tagline:"great movie", 
          average_rating:7
        }}
        video={'trailer'}
        displayAllMovies={jest.fn()}
      />
    )

    const title = screen.getByText('Money Plane');
    const releaseDate= screen.getByText('Release Date: 2020-09-29');
    const returnBtn = screen.getByRole('button');
    const overView = screen.getByTestId('overview');
    const genre = screen.getByTestId('genre');
    const budget = screen.getByText('Budget: $0');
    const revenue = screen.getByText('Revenue: $0');
    const runTime = screen.getByText('Runtime: 82');
    const tagline = screen.getByText('Tagline: great movie');
    const rating = screen.getByText('Rating: 7.0');
    

    expect(title).toBeInTheDocument();
    expect(releaseDate).toBeInTheDocument();
    expect(returnBtn).toBeInTheDocument();
    expect(overView).toBeInTheDocument();
    expect(genre).toBeInTheDocument();
    expect(budget).toBeInTheDocument();
    expect(revenue).toBeInTheDocument();
    expect(runTime).toBeInTheDocument();
    expect(tagline).toBeInTheDocument();
    expect(rating).toBeInTheDocument();
  })

  it('should call displayAllMovies function when click return button', () => {
    const returnMain = jest.fn()
    render(
      <ChosenMovie 
        movie={{
          id: 123456, 
          title:'Money Plane',
          poster_path:'https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg',
          backdrop_path:'https://image.tmdb.org/t/p/original//pq0JSpwyT2URytdFG0euztQPAyR.jpg',
          release_date:'2020-09-29',
          overview:"A professional thief with $40 million in debt and his family’s life on the line must",
          genres:['Action'],
          budget:1,
          revenue:20,
          runtime:2,
          tagline:'test', 
          average_rating:7
        }}
        video={'trailer'}
        displayAllMovies={returnMain}
      />
    )

    const returnBtn = screen.getByText('Go Back')

    fireEvent.click(returnBtn)

    expect(returnMain).toHaveBeenCalled();
  })
})