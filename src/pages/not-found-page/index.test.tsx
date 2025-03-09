import { render, screen } from '@testing-library/react';
import NotFound from '../404';
import '@testing-library/jest-dom';

describe('NotFound Component', () => {
  it('renders the 404 message', () => {
    render(<NotFound />);

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();

    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();

    expect(
      screen.getByText('You will be automatically redirected to the home page.')
    ).toBeInTheDocument();
  });

  it('renders the 404 image', () => {
    render(<NotFound />);

    const image = screen.getByAltText('404');
    expect(image).toBeInTheDocument();
  });

  it('renders the "Go to Home" link', () => {
    render(<NotFound />);

    const link = screen.getByRole('link', { name: /go to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
  });
});
