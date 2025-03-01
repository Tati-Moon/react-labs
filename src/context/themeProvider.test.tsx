import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeContext } from './themeContext';
import { ThemeProvider } from './themeProvider';

beforeEach(() => {
  localStorage.clear();
});

describe('ThemeProvider', () => {
  it('should set the default theme from localStorage or "dark"', () => {
    localStorage.setItem('theme', 'light');

    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => <span>{theme}</span>}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByText('light')).toBeInTheDocument();
  });

  it('should set the default theme to "dark" if localStorage has no theme', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme }) => <span>{theme}</span>}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('should apply theme to body class and toggle between dark and light', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <div>
              <span>{theme}</span>
              <button onClick={toggleTheme}>Toggle Theme</button>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    expect(document.body.classList.contains('dark')).toBe(true);
    expect(screen.getByText('dark')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(document.body.classList.contains('light')).toBe(true);
    expect(screen.getByText('light')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(document.body.classList.contains('dark')).toBe(true);
    expect(screen.getByText('dark')).toBeInTheDocument();
  });

  it('should toggle the theme between "dark" and "light"', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ theme, toggleTheme }) => (
            <div>
              <span>{theme}</span>
              <button onClick={toggleTheme}>Toggle Theme</button>
            </div>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const themeText = screen.getByText('dark');
    const toggleButton = screen.getByText('Toggle Theme');
    fireEvent.click(toggleButton);
    expect(themeText.textContent).toBe('light');
    fireEvent.click(toggleButton);
    expect(themeText.textContent).toBe('dark');
  });

  it('should save the theme in localStorage when toggled', () => {
    render(
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({ toggleTheme }) => (
            <button onClick={toggleTheme}>Toggle Theme</button>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    );

    const toggleButton = screen.getByText('Toggle Theme');
    expect(localStorage.getItem('theme')).toBe('dark');
    fireEvent.click(toggleButton);
    expect(localStorage.getItem('theme')).toBe('light');
    fireEvent.click(toggleButton);
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
