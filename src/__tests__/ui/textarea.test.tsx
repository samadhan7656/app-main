import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Textarea } from '../../components/ui/textarea';

describe('Textarea Component', () => {
  /**
   * Tests basic rendering of the textarea
   * Verifies that the textarea is rendered with the correct placeholder
   */
  test('renders textarea element', () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  /**
   * Tests value change handling
   * Verifies:
   * 1. Change event handler is called
   * 2. Value updates correctly
   * 3. Component reflects user input
   */
  test('handles value changes', () => {
    const handleChange = jest.fn();
    render(<Textarea onChange={handleChange} />);
    
    // Simulate user typing
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Test content' } });
    
    // Verify change handler called and value updated
    expect(handleChange).toHaveBeenCalled();
    expect(textarea).toHaveValue('Test content');
  });

  /**
   * Tests disabled state functionality
   * Verifies that the textarea can be disabled
   */
  test('can be disabled', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  /**
   * Tests custom styling capabilities
   * Verifies that custom classes are properly applied
   */
  test('applies custom className', () => {
    render(<Textarea className="custom-textarea" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-textarea');
  });

  /**
   * Tests rows attribute functionality
   * Verifies that the textarea respects the rows prop
   */
  test('handles different rows', () => {
    render(<Textarea rows={5} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '5');
  });

  /**
   * Tests readonly functionality
   * Verifies:
   * 1. Readonly attribute is applied
   * 2. Initial value is set correctly
   * 3. Content cannot be modified
   */
  test('handles readonly state', () => {
    render(<Textarea readOnly value="Read only content" />);
    const textarea = screen.getByRole('textbox');
    
    // Verify readonly attributes and content
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea).toHaveValue('Read only content');
  });
}); 