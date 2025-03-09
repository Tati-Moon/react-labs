'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import styles from './index.module.scss';
import Image from 'next/image';
import { useContext } from 'react';
import classNames from 'classnames';
import { ThemeContext } from '../../../context/themeContext';
import { useFetchByIdQuery } from '../../../services/PeopleService';

const Details = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';
  const id = searchParams.get('id');
  const { data: details, isLoading, error } = useFetchByIdQuery(id ?? '');

  if (!id) return null;

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('id');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={classNames(styles.detailsSection, {
        [styles.detailsSection_light]: isLight,
      })}
    >
      <button onClick={handleClose} className={styles.closeButton}>
        <Image
          src="/icons/close.png"
          width="12"
          height="12"
          alt="close"
          priority
          className={styles.closeIcon}
        />
        Close
      </button>
      {isLoading ? (
        <div className={styles.loading}>
          <Image
            src="/icons/load.gif"
            width="900"
            height="600"
            alt="Loading"
            priority
            className={styles.loadGif}
          />
        </div>
      ) : error ? (
        <div className={styles.error}>Failed to load character details.</div>
      ) : (
        details && (
          <div className={styles.detailsContent}>
            <h2>{details.name}</h2>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Height:</span>
              <span className={styles.detailValue}>{details.height}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Mass:</span>
              <span className={styles.detailValue}>{details.mass}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Gender:</span>
              <span className={styles.detailValue}>{details.gender}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Birth Year:</span>
              <span className={styles.detailValue}>{details.birth_year}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Hair Color:</span>
              <span className={styles.detailValue}>{details.hair_color}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Skin Color:</span>
              <span className={styles.detailValue}>{details.skin_color}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Eye Color:</span>
              <span className={styles.detailValue}>{details.eye_color}</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Details;
