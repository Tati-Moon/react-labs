import React, { useContext } from 'react';
import { ThemeContext } from '../../../context/themeContext';
import styles from './index.module.scss';
import moonIcon from '../../../assets/icons/moon.png';
import sunIcon from '../../../assets/icons/sun.png';
import classNames from 'classnames';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isLight = theme === 'light';

  return (
    <button
      onClick={toggleTheme}
      className={classNames(styles.toggle, {
        [styles.toggle_light]: isLight,
      })}
    >
      <img
        src={theme === 'dark' ? moonIcon : sunIcon}
        alt="Theme Icon"
        className={styles.buttonIcon}
      />
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
};

export default ThemeToggle;
