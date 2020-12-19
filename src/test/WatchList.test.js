import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WatchList from '../components/WatchList';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

describe('Watch list component', () => {

  it('should render empty watch list correctly', () => {
    render(
      <WatchList watchListMovies={() => jest.fn()} />,
      { wrapper: MemoryRouter }
    )

    const backButton = screen.getByRole('img');
    const watchListEmptyMessage = screen.getByText('No movies in your watch list. Please add to list!');

    expect(backButton).toBeInTheDocument();
    expect(watchListEmptyMessage).toBeInTheDocument();
  })

  it('should render a working back button', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <WatchList watchListMovies={() => jest.fn()} />
      </Router>
    )

    const backButton = screen.getByRole('img');
    userEvent.click(backButton);

    expect(history.location.pathname).not.toBe('/watch-list');
    expect(history.location.pathname).toBe('/');
  })

})