import React, { useContext } from 'react';
import styles from './index.module.scss';
import { CharacterDetails } from '../../../../../interfaces/characterDetails';
import { ThemeContext } from '../../../../../context/themeContext';
import classNames from 'classnames';

interface CardProps {
  name: string;
  details: CharacterDetails;
  isChecked: boolean;
  onCheckboxChange: () => void;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({
  name,
  details,
  isChecked,
  onCheckboxChange,
  onClick,
}) => {
  const themeContext = useContext(ThemeContext);

  const { theme } = themeContext;

  const isLight = theme === 'light';

  return (
    <div
      className={classNames(styles.cardContainer, {
        [styles.cardContainer_light]: isLight,
        [styles.checked]: isChecked,
      })}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <label className={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={onCheckboxChange}
            />
            <span className={styles.customCheckbox}></span>
          </label>
          <h4 className={styles.cardName}>{name}</h4>
        </div>

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
