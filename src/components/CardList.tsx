import { Component } from 'react';
import Card from './Card';
import loadGif from '../assets/icons/load.gif';

interface CardListProps {
  results: Array<{ name: string; url: string }>;
  loading: boolean;
  error: string | null;
}

class CardList extends Component<CardListProps> {
  render() {
    const { results, loading, error } = this.props;

    if (loading) {
      return (
        <div className="loading">
          <img src={loadGif} alt="logo" className="loadGif" />
        </div>
      );
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    return (
      <div className="card-list">
        {results.map((item, index) => (
          <Card key={index} name={item.name} url={item.url} />
        ))}
      </div>
    );
  }
}

export default CardList;
