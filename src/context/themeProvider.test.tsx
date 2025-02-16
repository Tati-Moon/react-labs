import { render, screen } from '@testing-library/react';
import { ThemeProvider } from './themeProvider';
import { ThemeContext } from './themeContext';
import { useContext } from 'react';

describe('ThemeProvider', () => {
  const TestComponent = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
      <div>
        <span data-testid="theme">{theme}</span>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    );
  };

  beforeEach(() => {
    localStorage.clear();
    document.body.className = '';
  });

  test('defaults to dark theme if no localStorage value is set', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    expect(document.body.className).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  test('uses stored theme from localStorage', () => {
    localStorage.setItem('theme', 'light');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(document.body.className).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
