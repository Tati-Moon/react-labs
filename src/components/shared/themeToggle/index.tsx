import Image from 'next/image';
import React, { useContext } from 'react';
import { ThemeContext } from '../../../context/themeContext';
import styles from './index.module.scss';
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
      <Image
        src={theme === 'dark' ? '/icons/moon.png' : '/icons/sun.png'}
        width="10"
        height="10"
        alt="Theme Icon"
        priority
        className={styles.buttonIcon}
      />
      {theme === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
};

export default ThemeToggle;
