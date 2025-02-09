import React from 'react';
import Card from './card';
import loadGif from '../../../../assets/icons/load.gif';
import { CharacterDetails } from '../../../../interfaces/characterDetails';

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
      <div className="loading">
        <img src={loadGif} alt="Loading" className="loadGif" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        Oops! Something went wrong. Please check your internet connection.
        <br />
        Try refreshing the page or checking your connection.
      </div>
    );
  }

  return (
    <div className="card-list">
      {results.map((item, index) => (
        <Card
          key={index}
          name={item.name}
          details={item}
          onClick={() => {
            return onItemClick(item.url.split('/').slice(-2)[0]);
          }}
        />
      ))}
    </div>
  );
};

export default CardList;
