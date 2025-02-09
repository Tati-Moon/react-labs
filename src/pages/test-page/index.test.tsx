import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TestPage from './index';
import { useParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('TestPage', () => {
  it('renders correctly with mocked id from URL', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '123' });

    render(
      <MemoryRouter initialEntries={['/test/123']}>
        <TestPage />
      </MemoryRouter>
    );

    expect(screen.getByText('TestPaget123')).toBeInTheDocument();
  });

  it('renders correctly with a different mocked id', () => {
    (useParams as jest.Mock).mockReturnValue({ id: '456' });

    render(
      <MemoryRouter initialEntries={['/test/456']}>
        <TestPage />
      </MemoryRouter>
    );

    expect(screen.getByText('TestPaget456')).toBeInTheDocument();
  });
});
