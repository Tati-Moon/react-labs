import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../consts/urls';
import { ICharacterDetail } from '../models/ICharacterDetail';

export const peopleAPI = createApi({
  reducerPath: 'peopleAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['People'],
  endpoints: (build) => ({
    fetchAll: build.query<
      { results: ICharacterDetail[]; count: number },
      { search?: string; page?: number }
    >({
      query: ({ search = '', page = 1 }) => ({
        url: '/people/',
        params: { search, page },
      }),
    }),
    fetchById: build.query<ICharacterDetail, string>({
      query: (id) => `/people/${id}/`,
    }),
  }),
});

export const { useFetchAllQuery, useFetchByIdQuery } = peopleAPI;
