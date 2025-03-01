import styles from './index.module.scss';
import React, { useContext } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { useFetchByIdQuery } from '../../services/PeopleService';
import loadGif from '../../assets/icons/load.gif';
import closeIcon from '../../assets/icons/close.png';
import { ThemeContext } from '../../context/themeContext';
import classNames from 'classnames';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { handleCloseDetails } = useOutletContext<{
    handleCloseDetails: () => void;
  }>();
  const { data: details, isLoading, error } = useFetchByIdQuery(id || '');
  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';

  return (
    <div
      className={classNames(styles.detailsSection, {
        [styles.detailsSection_light]: isLight,
      })}
    >
      <button onClick={handleCloseDetails} className={styles.closeButton}>
        <img src={closeIcon} alt="close" className={styles.closeIcon} /> Close
      </button>
      {isLoading ? (
        <div className={styles.loading}>
          <img src={loadGif} alt="Loading" className={styles.loadGif} />
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
