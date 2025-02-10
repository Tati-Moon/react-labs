import React from 'react';
import './index.scss';
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
            <button className="detail-button" onClick={onClick}>
              Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
