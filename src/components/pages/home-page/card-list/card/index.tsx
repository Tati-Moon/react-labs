import React from 'react';
import { CharacterDetails } from '../../../../../interfaces/characterDetails';

interface CardProps {
  name: string;
  details: CharacterDetails;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ name, details, onClick }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-name">{name}</div>
        {details && (
          <div className="card-details">
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
            <button className="details-button" onClick={onClick}>
              Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
