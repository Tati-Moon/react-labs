import { render, screen, fireEvent } from '@testing-library/react';
import SelectionHeader from './index';

jest.mock(
  '../../../../../assets/icons/checkbox_false.png',
  () => 'mocked-checkbox_false.png'
);
jest.mock(
  '../../../../../assets/icons/checkbox_true.png',
  () => 'mocked-checkbox_true.png'
);
jest.mock(
  '../../../../../assets/icons/checkbox_minus.png',
  () => 'mocked-checkbox_minus.png'
);

describe('SelectionHeader Component', () => {
  const mockOnToggleSelectAll = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders unchecked checkbox when no items are selected', () => {
    render(
      <SelectionHeader
        selectedCount={0}
        totalCount={10}
        onToggleSelectAll={mockOnToggleSelectAll}
      />
    );

    const checkboxImg = screen.getByAltText('Select All Toggle');
    expect(checkboxImg).toHaveAttribute('src', 'mocked-checkbox_false.png');
    expect(screen.queryByText(/Selected:/)).not.toBeInTheDocument();
  });

  test('renders checked checkbox when all items are selected', () => {
    render(
      <SelectionHeader
        selectedCount={10}
        totalCount={10}
        onToggleSelectAll={mockOnToggleSelectAll}
      />
    );

    const checkboxImg = screen.getByAltText('Select All Toggle');
    expect(checkboxImg).toHaveAttribute('src', 'mocked-checkbox_true.png');
    expect(screen.getByText('Selected: 10')).toBeInTheDocument();
  });

  test('renders indeterminate checkbox when some items are selected', () => {
    render(
      <SelectionHeader
        selectedCount={5}
        totalCount={10}
        onToggleSelectAll={mockOnToggleSelectAll}
      />
    );

    const checkboxImg = screen.getByAltText('Select All Toggle');
    expect(checkboxImg).toHaveAttribute('src', 'mocked-checkbox_minus.png');
    expect(screen.getByText('Selected: 5')).toBeInTheDocument();
  });

  test('calls onToggleSelectAll when button is clicked', () => {
    render(
      <SelectionHeader
        selectedCount={3}
        totalCount={10}
        onToggleSelectAll={mockOnToggleSelectAll}
      />
    );

    const checkboxButton = screen.getByRole('button');
    fireEvent.click(checkboxButton);

    expect(mockOnToggleSelectAll).toHaveBeenCalledTimes(1);
  });
});
