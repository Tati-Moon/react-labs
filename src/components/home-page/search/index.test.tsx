import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Search from './index';

jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
  return key === 'searchItem' ? '' : null;
});

jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
  console.log(`LocalStorage set: ${key} = ${value}`);
});

describe('Search Component', () => {
  const onSearchMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders search component correctly', () => {
    render(<Search onSearch={onSearchMock} />);
    expect(
      screen.getByPlaceholderText('Search for Star Wars characters...')
    ).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('calls onSearch and setSearchItem with trimmed input on button click', async () => {
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(
      'Search for Star Wars characters...'
    ) as HTMLInputElement;
    const button = screen.getByText('Search');
    const itemValue = '  Luke Skywalker  ';
    const itemResult = itemValue.trim();

    fireEvent.change(input, { target: { value: itemValue } });
    await waitFor(() => {
      expect(input?.value).toBe(itemValue);
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith(itemResult);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'searchItem',
        itemResult
      );
    });
  });

  test('calls onSearch and updates localStorage with trimmed input on Enter key press', async () => {
    render(<Search onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText(
      'Search for Star Wars characters...'
    );
    const itemValue = '  Darth Vader  ';
    const itemResult = itemValue.trim();

    fireEvent.change(input, { target: { value: itemValue } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith(itemResult);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'searchItem',
        itemResult
      );
    });
  });
});
