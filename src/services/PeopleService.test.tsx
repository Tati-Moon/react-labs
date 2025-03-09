import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useFetchAllQuery, useFetchByIdQuery } from './PeopleService';
import fetchMock from 'jest-fetch-mock';
import { setupStore } from '../store/store';
import { ReactNode } from 'react';
import { API_BASE_URL } from '../consts/urls';

const store = setupStore();
describe('peopleAPI', () => {
  function wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  beforeEach(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
    fetchMock.disableMocks();
  });

  it('fetches a list of characters', async () => {
    const endpointName = 'fetchAll';
    const people = '/people/';
    const data = {
      results: [{ id: '1', name: 'Luke Skywalker' }],
      count: 1,
    };
    const searchItem = 'searchItem';
    const currentPage = 2;
    const url = `${API_BASE_URL}${people}?search=${searchItem}&page=${currentPage}`;
    fetchMock.mockOnceIf(url, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify(data),
      })
    );
    const { result } = renderHook(
      () =>
        useFetchAllQuery({
          search: searchItem,
          page: currentPage,
        }),
      {
        wrapper,
      }
    );

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName,
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const calledRequest = fetchMock.mock.calls[0][0];

    const calledUrl =
      calledRequest instanceof Request ? calledRequest.url : calledRequest;
    expect(calledUrl).toBe(url);

    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName,
      data,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: data,
      isFetching: false,
    });
  });

  it('fetches a list of characters without searchItem and currentPage', async () => {
    const endpointName = 'fetchAll';
    const people = '/people/';
    const data = {
      results: [{ id: '1', name: 'Luke Skywalker' }],
      count: 1,
    };
    const searchItem = undefined;
    const currentPage = undefined;
    const url = `${API_BASE_URL}${people}?search=&page=1`;
    fetchMock.mockOnceIf(url, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify(data),
      })
    );
    const { result } = renderHook(
      () =>
        useFetchAllQuery({
          search: searchItem,
          page: currentPage,
        }),
      {
        wrapper,
      }
    );

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName,
      isLoading: true,
      isSuccess: false,
      isError: false,
      isFetching: true,
    });

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const calledRequest = fetchMock.mock.calls[0][0];

    const calledUrl =
      calledRequest instanceof Request ? calledRequest.url : calledRequest;
    expect(calledUrl).toBe(url);

    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName,
      data,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: data,
      isFetching: false,
    });
  });

  it('fetches a character by ID', async () => {
    const endpointName = 'fetchById';
    const characterId = '1';
    const urlFetchById = `${API_BASE_URL}/people/${characterId}/`;
    const characterData = {
      id: '1',
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
    };
    fetchMock.mockOnceIf(urlFetchById, JSON.stringify(characterData));

    fetchMock.mockOnceIf(urlFetchById, () =>
      Promise.resolve({
        status: 200,
        body: JSON.stringify(characterData),
      })
    );
    const { result } = renderHook(() => useFetchByIdQuery(characterId), {
      wrapper,
    });

    expect(result.current).toMatchObject({
      status: 'pending',
      endpointName,
      isLoading: true,
      isSuccess: false,
      isError: false,
    });
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const calledRequest = fetchMock.mock.calls[0][0];

    const calledUrl =
      calledRequest instanceof Request ? calledRequest.url : calledRequest;
    expect(calledUrl).toBe(urlFetchById);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current).toMatchObject({
      status: 'fulfilled',
      endpointName,
      data: characterData,
      isLoading: false,
      isSuccess: true,
      isError: false,
      currentData: characterData,
      isFetching: false,
    });
  });
});
