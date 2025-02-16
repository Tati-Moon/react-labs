import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CardList from './index';
import { ICharacterDetail } from '../../../../models/ICharacterDetail';
import { CharacterDetailsBuilder } from '../../../tests/utils/characterDetailsBuilder';

jest.mock('../../../../assets/icons/load.gif', () => 'mocked-load.gif');
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

jest.mock('../../../../store/reducers/SelectedPeoplesSlice', () => ({
  togglePeopleSelection: jest.fn(),
}));

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

const mockReducer = (state = {}) => state;
const store = createStore(mockReducer);

describe('CardList Component', () => {
  const mockOnItemClick = jest.fn();
  const mockResults: ICharacterDetail[] = [mockCharacter, mockCharacter2];

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    render(
      <Provider store={store}>
        <CardList
          results={[]}
          loading={true}
          error={null}
          onItemClick={mockOnItemClick}
          selectedPeoples={{}}
        />
      </Provider>
    );
    expect(screen.getByAltText('Loading')).toBeInTheDocument();
  });

  test('renders error message', () => {
    render(
      <Provider store={store}>
        <CardList
          results={[]}
          loading={false}
          error="Network Error"
          onItemClick={mockOnItemClick}
          selectedPeoples={{}}
        />
      </Provider>
    );
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
  });

  test('renders character cards when results are present', () => {
    render(
      <Provider store={store}>
        <CardList
          results={mockResults}
          loading={false}
          error={null}
          onItemClick={mockOnItemClick}
          selectedPeoples={{}}
        />
      </Provider>
    );
    expect(screen.getAllByText(/Unchecked|Checked/)).toHaveLength(
      mockResults.length
    );
  });

  /*
  test('toggles individual checkboxes', () => {
    render(
      <Provider store={store}>
        <CardList
          results={mockResults}
          loading={false}
          error={null}
          onItemClick={mockOnItemClick}
          selectedPeoples={{
            'https://swapi.dev/api/people/1/': true,
          }}
        />
      </Provider>
    );

    const buttons = screen.getAllByText(/Unchecked|Checked/);
    expect(buttons[0]).toHaveTextContent('Checked');

    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveTextContent('Unchecked');

    fireEvent.click(buttons[0]);
    expect(buttons[0]).toHaveTextContent('Checked');
  });
  */

  test('handles item selection', () => {
    render(
      <Provider store={store}>
        <CardList
          results={mockResults}
          loading={false}
          error={null}
          onItemClick={mockOnItemClick}
          selectedPeoples={{
            'https://swapi.dev/api/people/1/': true,
          }}
        />
      </Provider>
    );

    const [lukeButton] = screen.getAllByText(/Checked/);
    expect(lukeButton).toBeInTheDocument();

    const [darthButton] = screen.getAllByText(/Unchecked/);
    expect(darthButton).toBeInTheDocument();
  });
});
