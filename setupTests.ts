import '@testing-library/jest-dom';
import { TextEncoder } from 'util';
import fetchMock from 'jest-fetch-mock';

global.TextEncoder = TextEncoder;
fetchMock.enableMocks();
