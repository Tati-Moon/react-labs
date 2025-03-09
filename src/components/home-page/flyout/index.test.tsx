import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../../../store/store';
import { ThemeContext, ThemeContextType } from '../../../context/themeContext';
import Flyout from './index';
import { clearSelections } from '../../../store/reducers/SelectedPeoplesSlice';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('next/image', () => {
  const MockedImage = ({ src, alt }: { src: string; alt?: string }) => {
    return <img src={src} alt={alt || 'mocked image'} />;
  };
  MockedImage.displayName = 'NextImageMock';
  return MockedImage;
});

describe('Flyout Component', () => {
  const store = setupStore();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        href: '',
        assign: jest.fn(),
        reload: jest.fn(),
        replace: jest.fn(),
      },
      writable: true,
    });
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue({
      selected: {
        'https://swapi.dev/api/people/1/': true,
      },
    });
    jest.clearAllMocks();

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });
  });

  const defaultThemeContext: ThemeContextType = {
    theme: 'light',
    toggleTheme: jest.fn(),
  };

  const setup = (selectedCount = 3, themeContext = defaultThemeContext) =>
    render(
      <Provider store={store}>
        <ThemeContext.Provider value={themeContext}>
          <Flyout selectedCount={selectedCount} />
        </ThemeContext.Provider>
      </Provider>
    );

  test('renders selected count', () => {
    setup(5);
    expect(screen.getByText('5 items are selected')).toBeInTheDocument();
  });

  test('calls clearSelections when clicking "Unselect all"', () => {
    setup();
    const unselectButton = screen.getByText(/unselect all/i);
    fireEvent.click(unselectButton);

    expect(mockDispatch).toHaveBeenCalledWith(clearSelections());
  });

  test('renders the download button', () => {
    setup();
    expect(screen.getByText(/download/i)).toBeInTheDocument();
  });
  test('downloads CSV file when clicking "Download"', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    global.fetch = jest.fn().mockImplementation((url) => {
      if (url === 'https://swapi.dev/api/people/1/') {
        return Promise.resolve({
          ok: true,
          json: () =>
            Promise.resolve({
              name: 'Luke Skywalker',
              height: '172',
              mass: '77',
              url: 'https://swapi.dev/api/people/1/',
            }),
        });
      }

      return Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ message: 'Not Found' }),
      });
    });

    (useSelector as unknown as jest.Mock).mockReturnValue({
      'https://swapi.dev/api/people/1/': true,
    });

    setup(1);

    const downloadButton = screen.getByText(/download/i);
    fireEvent.click(downloadButton);

    await new Promise((res) => setTimeout(res, 100));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://swapi.dev/api/people/1/'
    );

    consoleErrorSpy.mockRestore();
  });

  test('applies correct theme styling', () => {
    setup(3, { theme: 'light', toggleTheme: jest.fn() });

    const lightFlyoutElement = screen.getByText(/3 items are selected/i);
    const flyoutContainer = lightFlyoutElement.closest('.flyout');

    expect(flyoutContainer).toHaveClass('flyout_light');
  });

  test('should correctly retrieve selected items from mocked useSelector', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      url1: true,
      url2: true,
    });

    render(<Flyout selectedCount={2} />);

    expect(screen.getByText('2 items are selected')).toBeInTheDocument();
  });

  test('should log error when handleDownload fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error')));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    render(
      <Provider store={store}>
        <Flyout selectedCount={2} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Download'));

    await waitFor(() =>
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Fail to Load Data:',
        new Error('Network error')
      )
    );

    consoleErrorSpy.mockRestore();
  });
  test('should throw error if fetch fails', async () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({ url1: true });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        statusText: 'Not Found',
        json: () => Promise.reject('error'),
      } as Response)
    );

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    render(
      <Provider store={store}>
        <Flyout selectedCount={2} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Download'));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Fail to Load Data:',
        expect.objectContaining({
          message: 'Request Error: url1',
        })
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
