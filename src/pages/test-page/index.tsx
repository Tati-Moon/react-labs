import React from 'react';
import { useParams } from 'react-router-dom';

const TestPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  return <div className="details-section">TestPaget{id}</div>;
};

export default TestPage;
