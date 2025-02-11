import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NotFound from '.';

jest.mock('../../assets/icons/404.png', () => 'mocked-404.png');

describe('NotFound component', () => {
  const renderNotFound = () => {
    render(
      <Router>
        <NotFound />
      </Router>
    );
  };

  test('renders 404 page with correct text', () => {
    renderNotFound();

    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/The page you are looking for does not exist./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /You will be automatically redirected to the home page./i
      )
    ).toBeInTheDocument();
  });

  test('renders image with 404 class', () => {
    renderNotFound();

    const image = screen.getByAltText('404') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass('pageNotFoundImage');
    expect(image.src).toContain('mocked-404.png');
  });

  test('renders "Go to Home" link', () => {
    renderNotFound();

    const link = screen.getByText(/Go to Home/i);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
