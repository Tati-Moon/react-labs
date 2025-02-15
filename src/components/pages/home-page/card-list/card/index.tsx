import React from 'react';
import styles from './index.module.scss';
import { CharacterDetails } from '../../../../../interfaces/characterDetails';

interface CardProps {
  name: string;
  details: CharacterDetails;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ name, details, onClick }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <div className={styles.cardName}>{name}</div>
        {details && (
          <div className={styles.cardDetails}>
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
            <button className={styles.detailButton} onClick={onClick}>
              Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
