'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';
import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import classNames from 'classnames';

export default function HomePage() {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';

  return (
    <main
      className={classNames(styles.container, {
        [styles.container_light]: isLight,
      })}
    >
      <h1 className={styles.title}>RS School React Labs Project</h1>
      <p className={styles.description}>
        This project is developed as part task in the RS School React course. It
        utilizes Next.js for server-side rendering and enhanced performance.
      </p>
      <div className={styles.imageGrid}>
        <div className={styles.imageContainer}>
          <Image
            src="/rs-school.webp"
            alt="RS School Logo"
            width={100}
            height={100}
            priority
          />
          <p className={styles.imageText}>RS School</p>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/reactjs.png"
            alt="React.js Logo"
            width={120}
            height={100}
            priority
          />
          <p className={styles.imageText}>React.js</p>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src="/nextjs.png"
            alt="Next.js Logo"
            width={100}
            height={100}
            priority
          />
          <p className={styles.imageText}>Next.js</p>
        </div>
      </div>
      <nav>
        <Link href="/home" className={styles.link}>
          Move to home page
        </Link>
      </nav>
    </main>
  );
}
