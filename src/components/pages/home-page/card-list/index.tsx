import React from 'react';
import Card from './card';
import styles from './index.module.scss';
import loadGif from '../../../../assets/icons/load.gif';
import { CharacterDetails } from '../../../../interfaces/characterDetails';
import { extractIdFromUrl } from '../../../../utils/urlUtils';

interface CardListProps {
  results: Array<CharacterDetails>;
  loading: boolean;
  error: string | null;
  onItemClick: (id: string) => void;
}

const CardList: React.FC<CardListProps> = ({
  results,
  loading,
  error,
  onItemClick,
}) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <img src={loadGif} alt="Loading" className="loadGif" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        Oops! Something went wrong. Please check your internet connection.
        <br />
        Try refreshing the page or checking your connection.
      </div>
    );
  }

  return (
    <div className={styles.cardList}>
      {results.map((item, index) => {
        const id = extractIdFromUrl(item.url);

        return (
          <Card
            key={index}
            name={item.name}
            details={item}
            onClick={() => {
              if (id) {
                onItemClick(id);
              } else {
                console.error('Failed to extract ID from URL:', item.url);
              }
            }}
          />
        );
      })}
    </div>
  );
};

export default CardList;
