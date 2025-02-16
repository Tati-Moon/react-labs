import React, { useState } from 'react';
import Card from './card';
import styles from './index.module.scss';
import loadGif from '../../../../assets/icons/load.gif';
import { CharacterDetails } from '../../../../interfaces/characterDetails';
import SelectionHeader from './header';

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
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );

  const toggleCheckbox = (id: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleSelectAll = () => {
    const allSelected = Object.values(selectedItems).every(Boolean);
    const newSelection = results.reduce(
      (acc, item) => {
        acc[item.url] = !allSelected;
        return acc;
      },
      {} as Record<string, boolean>
    );
    setSelectedItems(newSelection);
  };

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

  const selectedCount = Object.values(selectedItems).filter(Boolean).length;

  return (
    <div>
      <SelectionHeader
        selectedCount={selectedCount}
        totalCount={results.length}
        onToggleSelectAll={toggleSelectAll}
      />

      <div className={styles.cardList}>
        {results.map((item) => (
          <Card
            key={item.url}
            name={item.name}
            details={item}
            isChecked={!!selectedItems[item.url]}
            onCheckboxChange={() => toggleCheckbox(item.url)}
            onClick={() => onItemClick(item.url.split('/').slice(-2)[0])}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
