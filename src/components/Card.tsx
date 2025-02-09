import { Component } from 'react';

interface CharacterDetails {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

interface CardProps {
  name: string;
  url: string;
}

interface CardState {
  details: CharacterDetails | null;
}

class Card extends Component<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);
    this.state = {
      details: null,
    };
  }

  componentDidMount() {
    this.fetchDetails();
  }

  fetchDetails = async () => {
    try {
      const response = await fetch(this.props.url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: CharacterDetails = await response.json();
      this.setState({ details: data });
    } catch (error) {
      console.error('Failed to fetch details:', error);
    }
  };

  render() {
    const { name } = this.props;
    const { details } = this.state;

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
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Card;
