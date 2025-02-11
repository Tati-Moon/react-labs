import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './index';
import { PEOPLE_ENDPOINT } from '../../consts/urls';
import { ITEMS_PER_PAGE } from '../../consts/constants';
import { act } from 'react';

global.fetch = jest.fn();

jest.mock('../../assets/icons/logo.png', () => 'mocked-logoIcon.png');
jest.mock('../../assets/icons/load.gif', () => 'mocked-load.gif');
jest.mock('../../assets/icons/search.png', () => 'mocked-search.png');
jest.mock('../../assets/icons/next.png', () => 'mocked-next.png');
jest.mock('../../assets/icons/previous.png', () => 'mocked-previous.png');

const mockCharacterName = 'Luke Skywalker';
const mockCharacterName2 = 'Darth Vader';

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders logo and search bar', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );
    });
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  const mockCharacters = {
    count: 2,
    results: [
      { name: mockCharacterName, url: 'https://swapi.dev/api/people/1/' },
      { name: mockCharacterName2, url: 'https://swapi.dev/api/people/4/' },
    ],
  };

  test('fetches and displays character results', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacters,
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(mockCharacterName)).toBeInTheDocument();
      expect(screen.getByText(mockCharacterName2)).toBeInTheDocument();
    });
  });

  test('handles pagination updates', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...mockCharacters, count: ITEMS_PER_PAGE * 3 }),
    });

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(mockCharacterName)).toBeInTheDocument()
    );

    const nextPageButton = screen.getByTestId('next-page');
    await act(async () => {
      fireEvent.click(nextPageButton);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`${PEOPLE_ENDPOINT}?search=&page=2`);
    });
  });

  test('displays an error message when fetch fails', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          /Oops! Something went wrong. Please check your internet connection./
        )
      ).toBeInTheDocument();
    });
  });
});
