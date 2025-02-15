import { render, screen, fireEvent } from '@testing-library/react';
import Card from './index';
import { CharacterDetailsBuilder } from '../../../../tests/utils/characterDetailsBuilder';

describe('Card Component', () => {
  const mockOnClick = jest.fn();

  const mockCharacterName = 'Luke Skywalker';

  const mockCharacter = new CharacterDetailsBuilder()
    .setName(mockCharacterName)
    .setHeight('172')
    .setMass('77')
    .setGender('male')
    .setBirthYear('19BBY')
    .setHairColor('blond')
    .setSkinColor('fair')
    .setEyeColor('blue')
    .build();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders character name', () => {
    render(
      <Card
        name={mockCharacter.name}
        details={mockCharacter}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText(mockCharacterName)).toBeInTheDocument();
  });

  test('renders character details correctly', () => {
    render(
      <Card
        name={mockCharacter.name}
        details={mockCharacter}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText('Height:')).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.height)).toBeInTheDocument();

    expect(screen.getByText('Mass:')).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.mass)).toBeInTheDocument();

    expect(screen.getByText('Gender:')).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.gender)).toBeInTheDocument();
  });

  test('calls onClick when "Details" button is clicked', () => {
    render(
      <Card
        name={mockCharacter.name}
        details={mockCharacter}
        onClick={mockOnClick}
      />
    );

    const detailsButton = screen.getByText('Details');
    fireEvent.click(detailsButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
