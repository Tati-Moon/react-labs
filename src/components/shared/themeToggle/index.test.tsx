import { render, fireEvent } from '@testing-library/react';
import { ThemeContext, ThemeContextType } from '../../../context/themeContext';
import ThemeToggle from '.';

jest.mock('../../../assets/icons/moon.png', () => 'mocked-moon.png');
jest.mock('../../../assets/icons/sun.png', () => 'mocked-sun.png');

const mockThemeContext: ThemeContextType = {
  theme: 'light',
  toggleTheme: jest.fn(),
};

describe('ThemeToggle Component', () => {
  it('renders with light theme by default', () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    expect(getByText('Light')).toBeInTheDocument();
  });

  it('renders with dark theme when theme is dark', () => {
    const { getByText } = render(
      <ThemeContext.Provider value={{ ...mockThemeContext, theme: 'dark' }}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    expect(getByText('Dark')).toBeInTheDocument();
  });

  it('calls toggleTheme when the button is clicked', () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockThemeContext}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    const button = getByText('Light');
    fireEvent.click(button);

    expect(mockThemeContext.toggleTheme).toHaveBeenCalled();
  });
});
