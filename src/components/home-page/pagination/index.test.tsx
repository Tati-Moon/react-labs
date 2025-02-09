import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './index';

describe('Pagination Component', () => {
  const onPageChangeMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination component correctly', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  test('disables previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  test('disables next button on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    expect(screen.getByText('Next')).toBeDisabled();
  });

  test('calls onPageChange with correct page number when next is clicked', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    fireEvent.click(screen.getByText('Next'));
    expect(onPageChangeMock).toHaveBeenCalledWith(3);
  });

  test('calls onPageChange with correct page number when previous is clicked', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    fireEvent.click(screen.getByText('Previous'));
    expect(onPageChangeMock).toHaveBeenCalledWith(2);
  });

  test('does not call onPageChange when next is clicked on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    fireEvent.click(screen.getByText('Next'));
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });

  test('does not call onPageChange when previous is clicked on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );
    fireEvent.click(screen.getByText('Previous'));
    expect(onPageChangeMock).not.toHaveBeenCalled();
  });
});
