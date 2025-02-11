import { render, screen, fireEvent } from '@testing-library/react';
import CardList from './index';
import Card from './card';
import { CharacterDetails } from '../../../../interfaces/characterDetails';
import { CharacterDetailsBuilder } from '../../../tests/utils/characterDetailsBuilder';

jest.mock('./card', () => jest.fn(() => <div>Mock Card</div>));

jest.mock('../../../../assets/icons/load.gif', () => 'mocked-load.gif');

const mockCharacter = new CharacterDetailsBuilder()
  .setName('Luke Skywalker')
  .setHeight('172')
  .setMass('77')
  .setGender('male')
  .setBirthYear('19BBY')
  .setHairColor('blond')
  .setSkinColor('fair')
  .setEyeColor('blue')
  .setUrl('https://swapi.dev/api/people/1/')
  .build();

const mockCharacter2 = new CharacterDetailsBuilder()
  .setName('Darth Vader')
  .setHeight('202')
  .setMass('136')
  .setGender('male')
  .setBirthYear('41.9BBY')
  .setHairColor('none')
  .setSkinColor('fair')
  .setEyeColor('yellow')
  .setUrl('https://swapi.dev/api/people/4/')
  .build();

describe('CardList Component', () => {
  const mockOnItemClick = jest.fn();
  const mockResults: CharacterDetails[] = [mockCharacter, mockCharacter2];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    render(
      <CardList
        results={[]}
        loading={true}
        error={null}
        onItemClick={mockOnItemClick}
      />
    );
    expect(screen.getByAltText('Loading')).toBeInTheDocument();
  });

  test('renders error message', () => {
    render(
      <CardList
        results={[]}
        loading={false}
        error={'Network Error'}
        onItemClick={mockOnItemClick}
      />
    );
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
  });

  test('renders character cards when results are present', () => {
    render(
      <CardList
        results={mockResults}
        loading={false}
        error={null}
        onItemClick={mockOnItemClick}
      />
    );
    expect(screen.getAllByText('Mock Card')).toHaveLength(mockResults.length);
  });

  test('calls onItemClick with the correct ID when a card is clicked', () => {
    (Card as jest.Mock).mockImplementation(({ onClick }) => (
      <button onClick={onClick}>Mock Card</button>
    ));

    render(
      <CardList
        results={mockResults}
        loading={false}
        error={null}
        onItemClick={mockOnItemClick}
      />
    );
    const buttons = screen.getAllByText('Mock Card');

    fireEvent.click(buttons[0]);
    expect(mockOnItemClick).toHaveBeenCalledWith('1');

    fireEvent.click(buttons[1]);
    expect(mockOnItemClick).toHaveBeenCalledWith('4');
  });
});
