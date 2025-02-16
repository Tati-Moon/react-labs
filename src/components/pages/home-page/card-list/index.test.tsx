import { render, screen, fireEvent } from '@testing-library/react';
import CardList from './index';
import { CharacterDetails } from '../../../../interfaces/characterDetails';
import { CharacterDetailsBuilder } from '../../../tests/utils/characterDetailsBuilder';

jest.mock(
  '../../../../assets/icons/checkbox_false.png',
  () => 'mocked-checkbox_false.png'
);
jest.mock(
  '../../../../assets/icons/checkbox_true.png',
  () => 'mocked-checkbox_true.png'
);
jest.mock(
  '../../../../assets/icons/checkbox_minus.png',
  () => 'mocked-checkbox_minus.png'
);

jest.mock('./card', () =>
  jest.fn(({ isChecked, onCheckboxChange }) => (
    <div>
      <button onClick={onCheckboxChange}>
        {isChecked ? 'Checked' : 'Unchecked'}
      </button>
    </div>
  ))
);

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
    expect(screen.getAllByText(/Unchecked|Checked/)).toHaveLength(
      mockResults.length
    );
  });

  test('toggles individual checkboxes', () => {
    render(
      <CardList
        results={mockResults}
        loading={false}
        error={null}
        onItemClick={mockOnItemClick}
      />
    );
    const buttons = screen.getAllByText(/Unchecked|Checked/);

    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveTextContent('Checked');

    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveTextContent('Unchecked');
  });

  test('updates selected count correctly', () => {
    render(
      <CardList
        results={mockResults}
        loading={false}
        error={null}
        onItemClick={mockOnItemClick}
      />
    );

    const selectAllButton = screen.getByRole('button', {
      name: /Select All Toggle/i,
    });
    const checkboxes = screen.getAllByText(/Unchecked|Checked/);

    fireEvent.click(checkboxes[0]);
    expect(screen.getByText('Selected: 1')).toBeInTheDocument();

    fireEvent.click(checkboxes[1]);
    expect(screen.getByText('Selected: 2')).toBeInTheDocument();

    fireEvent.click(selectAllButton);
    expect(screen.queryByText(/Selected:/)).not.toBeInTheDocument();
  });
});
