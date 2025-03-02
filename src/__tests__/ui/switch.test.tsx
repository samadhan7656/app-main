import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Switch } from '../../components/ui/switch';

describe('Switch Component', () => {
  /**
   * Tests basic rendering of the switch component
   * Verifies that the switch is present and has the correct ARIA role
   */
  test('renders switch component', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  /**
   * Tests the toggle functionality of the switch
   * Verifies:
   * 1. Initial unchecked state
   * 2. Click handling
   * 3. Callback execution with correct value
   */
  test('handles toggle state', () => {
    const handleCheckedChange = jest.fn();
    render(<Switch onCheckedChange={handleCheckedChange} />);
    
    // Get switch element and verify initial state
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
    
    // Test toggle interaction
    fireEvent.click(switchElement);
    expect(handleCheckedChange).toHaveBeenCalledWith(true);
  });

  /**
   * Tests the disabled state of the switch
   * Verifies that the switch can be disabled and has correct attributes
   */
  test('can be disabled', () => {
    render(<Switch disabled />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });

  /**
   * Tests custom styling capabilities
   * Verifies that custom classes can be applied to the switch
   */
  test('applies custom className', () => {
    render(<Switch className="custom-switch" />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('custom-switch');
  });

  /**
   * Tests controlled component behavior
   * Verifies:
   * 1. Switch responds to external state changes
   * 2. ARIA attributes update correctly
   * 3. Re-rendering with different props works
   */
  test('can be controlled', () => {
    const { rerender } = render(<Switch checked={true} />);
    const switchElement = screen.getByRole('switch');
    
    // Test initial checked state
    expect(switchElement).toHaveAttribute('aria-checked', 'true');

    // Test state update through props
    rerender(<Switch checked={false} />);
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
  });
}); 