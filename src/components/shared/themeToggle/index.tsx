import React, { useContext } from 'react';
import styles from './index.module.scss';
import { ThemeContext } from '../../../context/themeContext';

const ThemeToggle: React.FC = () => {
  const themeContext = useContext(ThemeContext);

  const { theme, toggleTheme } = themeContext;

  return (
    <button
      onClick={toggleTheme}
      className={`${styles.toggle} ${styles[theme]}`}
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeToggle;
