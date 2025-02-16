import React from 'react';
import styles from './index.module.scss';
import checkboxFalse from '../../../../../assets/icons/checkbox_false.png';
import checkboxTrue from '../../../../../assets/icons/checkbox_true.png';
import checkboxMinus from '../../../../../assets/icons/checkbox_minus.png';

interface SelectionHeaderProps {
  selectedCount: number;
  totalCount: number;
  onToggleSelectAll: () => void;
}

const SelectionHeader: React.FC<SelectionHeaderProps> = ({
  selectedCount,
  totalCount,
  onToggleSelectAll,
}) => {
  const getCheckboxIcon = () => {
    if (selectedCount === 0) return checkboxFalse;
    if (selectedCount === totalCount) return checkboxTrue;
    return checkboxMinus;
  };

  return (
    <div className={styles.header}>
      <button onClick={onToggleSelectAll} className={styles.checkboxButton}>
        <img src={getCheckboxIcon()} alt="Select All Toggle" />
      </button>
      {selectedCount > 0 && (
        <h4 className={styles.selectedText}>Selected: {selectedCount}</h4>
      )}
    </div>
  );
};

export default SelectionHeader;
