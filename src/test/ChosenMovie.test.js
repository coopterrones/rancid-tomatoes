import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ChosenMovie from '../components/ChosenMovie';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { _movieId, _movie, _video } from '../test/mockData/chosenMovieMockData';
import { apiCalls } from '../apiCalls';
jest.mock('../apiCalls');

describe('ChosenMovie Component', () => {

  beforeEach(() => {
    apiCalls.selectMovie.mockResolvedValueOnce(_movie);
    apiCalls.selectVideo.mockResolvedValueOnce(_video);
  })

  it('should display loading', async () => {
    const history = createMemoryHistory();
    render(<Router history={history}><ChosenMovie match={_movieId} /></Router>)

    const loadingScreen = screen.getByText('Loading...');

    await waitFor(() => expect(loadingScreen).toBeInTheDocument());
  })

  it('should call selectMovie', async () => {
    const history = createMemoryHistory();
    render(<Router history={history}><ChosenMovie match={_movieId} /></Router>)

    await waitFor(() => expect(apiCalls.selectMovie).toHaveBeenCalledTimes(1));
  })

  it('should call selectVideo', async () => {
    const history = createMemoryHistory();
    render(<Router history={history}><ChosenMovie match={_movieId} /></Router>)

    await waitFor(() => expect(apiCalls.selectVideo).toHaveBeenCalledTimes(1));
  })

  it('should render correctly', async () => {
    const history = createMemoryHistory();
    render(<Router history={history}><ChosenMovie match={_movieId} /></Router>)

    const title = await waitFor(() => screen.getByText('Mulan'));
    const releaseDate = await waitFor(() => screen.getByText('Sep 03, 2020'));
    const returnBtn = await waitFor(() => screen.getAllByRole('img')[0]);
    const overView = await waitFor(() => screen.getByTestId('overview'));
    const genre = await waitFor(() => screen.getByTestId('genre'));
    const budget = await waitFor(() => screen.getByText('Budget: $200M'));
    const revenue = await waitFor(() => screen.getByText('Revenue: $57M'));
    const runTime = await waitFor(() => screen.getByText('115min.'));
    const tagline = await waitFor(() => screen.getByText('Tagline: this is a tagline'));
    const rating = await waitFor(() => screen.getByText('4.9'));

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

  it('should return home page upon clicking back button', async () => {
    const history = createMemoryHistory();
    render(<Router history={history}><ChosenMovie match={_movieId} /></Router>);

    const returnBtn = await waitFor(() => screen.getByTestId('return-btn'));
    userEvent.click(returnBtn);

    expect(history.location.pathname).toBe('/');
  })

})
