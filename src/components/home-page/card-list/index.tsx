import React from 'react';
import { useDispatch } from 'react-redux';
import Card from './card';
import styles from './index.module.scss';
import loadGif from '../../../assets/icons/load.gif';
import { ICharacterDetail } from '../../../models/ICharacterDetail';
import { togglePeopleSelection } from '../../../store/reducers/SelectedPeoplesSlice';

interface CardListProps {
  results: Array<ICharacterDetail>;
  loading: boolean;
  error: string | null;
  onItemClick: (id: string) => void;
  selectedPeoples: Record<string, boolean>;
}

const CardList: React.FC<CardListProps> = ({
  results,
  loading,
  error,
  onItemClick,
  selectedPeoples,
}) => {
  const dispatch = useDispatch();

  const handleToggleCheckbox = (id: string) => {
    dispatch(togglePeopleSelection(id));
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <img src={loadGif} alt="Loading" className={styles.loadGif} />
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
    <div>
      <div className={styles.cardList}>
        {results.map((item) => (
          <Card
            key={item.url}
            name={item.name}
            details={item}
            isChecked={!!selectedPeoples[item.url]}
            onCheckboxChange={() => handleToggleCheckbox(item.url)}
            onClick={() => onItemClick(item.url.split('/').slice(-2)[0])}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
