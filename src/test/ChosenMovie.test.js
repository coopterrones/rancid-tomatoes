import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChosenMovie from '../components/ChosenMovie';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { _movieId, _movie, _video} from '../test/mockData/chosenMovieMockData';
import { apiCalls } from '../apiCalls';
jest.mock('../apiCalls')

describe('ChosenMovie Component', () => {
  beforeEach(() => {
    apiCalls.selectMovie.mockResolvedValueOnce(_movie);
    apiCalls.selectVideo.mockResolvedValueOnce(_video);

    // render(<ChosenMovie match={_movieId}/>, {wrapper: MemoryRouter})
  })

  it('should display loading', () => {
    const history = createMemoryHistory();
    render(<Router history={history}><ChosenMovie match={_movieId} /></Router>)

    const loadingScreen = screen.getByText('Loading...');

    expect(loadingScreen).toBeInTheDocument();
  })

  it('should call selectMovie', () => {
    const history = createMemoryHistory();
    render(<Router history={history}><ChosenMovie match={_movieId} /></Router>)

    expect(apiCalls.selectMovie).toHaveBeenCalledTimes(1);
  })

  it('should call selectVideo', () => {
    const history = createMemoryHistory();
    render(<Router history={history}><ChosenMovie match={_movieId} /></Router>)

    expect(apiCalls.selectVideo).toHaveBeenCalledTimes(1);
  })

  it('should render correctly', async() => {
    const history = createMemoryHistory();
    render(<Router history={history}><ChosenMovie match={_movieId} /></Router>)

    const title = await waitFor(() => screen.getByText('Mulan'));
    const releaseDate= await waitFor(() => screen.getByText('Release Date: 2020-09-04'));
    const returnBtn = await waitFor(() => screen.getByRole('img'));
    const overView = await waitFor(() => screen.getByTestId('overview'));
    const genre = await waitFor(() => screen.getByTestId('genre'));
    const budget = await waitFor(() => screen.getByText('Budget: $200000000'));
    const revenue = await waitFor(() => screen.getByText('Revenue: $57000000'));
    const runTime = await waitFor(() => screen.getByText('Runtime: 115'));
    const tagline = await waitFor(() => screen.getByText('Tagline: this is a tagline'));
    const rating = await waitFor(() => screen.getByText('Rating: 4.9'));

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

  it('should return home page upon clicking back button', async() => {
    const history = createMemoryHistory();
    render(<Router history={history}><ChosenMovie match={_movieId} /></Router>);

    const returnBtn = await waitFor(() => screen.getByTestId('return-btn'));
    fireEvent.click(returnBtn);
 
    expect(history.location.pathname).toBe('/');
  })
})
