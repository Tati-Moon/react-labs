import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './index';

const BuggyComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render error UI when an error occurs in a child component', () => {
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Unexpected Error')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Something went wrong. Please try refreshing the page or contact support.'
      )
    ).toBeInTheDocument();
  });

  it('should call componentDidCatch when an error occurs', () => {
    const spy = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(spy).toHaveBeenCalled();
  });

  it('should reload the page when the reload button is clicked', () => {
    const originalLocation = window.location;

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...originalLocation, reload: jest.fn() },
    });

    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByText('Reload Page');
    fireEvent.click(reloadButton);

    expect(window.location.reload).toHaveBeenCalledTimes(1);

    window.location = originalLocation;
  });
});
