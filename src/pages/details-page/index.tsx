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
    <div className="details-section">
      <button onClick={handleCloseDetails} className="close-button">
        <img src={closeIcon} alt="close" className="closeIcon" />
        Close
      </button>
      {loading ? (
        <div className="loading">
          <img src={loadGif} alt="Loading" className="loadGif" />
        </div>
      ) : (
        details && (
          <div className="details-content">
            <h2>{details.name}</h2>
            <div className="detail-item">
              <span className="detail-label">Height:</span>
              <span className="detail-value">{details.height}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Mass:</span>
              <span className="detail-value">{details.mass}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Gender:</span>
              <span className="detail-value">{details.gender}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Birth Year:</span>
              <span className="detail-value">{details.birth_year}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Hair Color:</span>
              <span className="detail-value">{details.hair_color}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Skin Color:</span>
              <span className="detail-value">{details.skin_color}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Eye Color:</span>
              <span className="detail-value">{details.eye_color}</span>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Details;
