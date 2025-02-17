import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.scss';
import classNames from 'classnames';
import downloadsIcon from '../../../assets/icons/downloads.png';
import { RootState } from '../../../store/store';
import { clearSelections } from '../../../store/reducers/SelectedPeoplesSlice';
import { ThemeContext } from '../../../context/themeContext';

interface FlyoutProps {
  selectedCount: number;
}

const Flyout: React.FC<FlyoutProps> = ({ selectedCount }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedPeoples.selected
  );

  const handleUnselectAll = () => {
    dispatch(clearSelections());
  };

  const handleDownload = async () => {
    try {
      const selectedUrls = Object.keys(selectedItems).filter(
        (url) => selectedItems[url]
      );
      const fetchedData = await Promise.all(
        selectedUrls.map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Request Error: ${url}`);
          }
          return response.json();
        })
      );

      const csvHeader = 'name,height,mass,url\n';
      const csvContent = `data:text/csv;charset=utf-8,${csvHeader}${fetchedData
        .map((item) => `${item.name},${item.height},${item.mass},${item.url}`)
        .join('\n')}`;

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${selectedUrls.length}_items.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Fail to Load Data:', error);
    }
  };

  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;
  const isLight = theme === 'light';

  return (
    <div
      className={classNames(styles.flyout, {
        [styles.flyout_light]: isLight,
      })}
    >
      <div className={styles.flyoutContent}>
        <h4>{selectedCount} items are selected</h4>
        <button onClick={handleUnselectAll} className={styles.flyoutButton}>
          Unselect all
        </button>
        <button onClick={handleDownload} className={styles.flyoutButton}>
          <img
            src={downloadsIcon}
            alt="previous"
            className={styles.downloadsIcon}
          />
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
