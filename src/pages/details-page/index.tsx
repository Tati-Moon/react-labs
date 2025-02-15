import styles from './index.module.scss';
import React, { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { CharacterDetails } from '../../interfaces/characterDetails';
import { PEOPLE_ENDPOINT } from '../../consts/urls';
import loadGif from '../../assets/icons/load.gif';
import closeIcon from '../../assets/icons/close.png';

const Details: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<CharacterDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { handleCloseDetails } = useOutletContext<{
    handleCloseDetails: () => void;
  }>();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${PEOPLE_ENDPOINT}/${id}/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: CharacterDetails = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Failed to fetch details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <div className={styles.detailsSection}>
      <button onClick={handleCloseDetails} className={styles.closeButton}>
        <img src={closeIcon} alt="close" className={styles.closeIcon} />
        Close
      </button>
      {loading ? (
        <div className={styles.loading}>
          <img src={loadGif} alt="Loading" className={styles.loadGif} />
        </div>
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
