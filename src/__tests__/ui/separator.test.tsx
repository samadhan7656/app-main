import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Separator } from '../../components/ui/separator';

describe('Separator Component', () => {
  /**
   * Tests default horizontal separator rendering
   * Verifies:
   * 1. Correct role attribute
   * 2. Default horizontal styling classes
   * 3. Proper dimensions
   */
  test('renders horizontal separator by default', () => {
    const { container } = render(<Separator />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveAttribute('role', 'separator');
    expect(separator).toHaveClass('shrink-0', 'bg-border', 'h-[1px]', 'w-full');
  });

  /**
   * Tests vertical separator rendering
   * Verifies:
   * 1. Correct orientation
   * 2. Proper vertical styling classes
   * 3. Appropriate dimensions for vertical layout
   */
  test('renders vertical separator', () => {
    const { container } = render(<Separator orientation="vertical" />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveAttribute('role', 'separator');
    expect(separator).toHaveClass('h-full', 'w-[1px]');
  });

  /**
   * Tests custom styling capabilities
   * Verifies that custom classes can be applied
   * while maintaining base functionality
   */
  test('applies custom className', () => {
    const { container } = render(<Separator className="custom-separator" />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveClass('custom-separator');
  });

  /**
   * Tests accessibility attributes
   * Verifies:
   * 1. Proper role attribute
   * 2. Correct aria-orientation
   * 3. Accessibility standards compliance
   */
  test('maintains accessibility attributes', () => {
    const { container } = render(<Separator orientation="horizontal" />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveAttribute('role', 'separator');
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  });

  /**
   * Tests decorative separator functionality
   * Verifies that when marked as decorative:
   * 1. Role is set to 'none'
   * 2. Separator maintains visual appearance
   * 3. Semantic meaning is removed for accessibility
   */
  test('decorative separator has correct role', () => {
    const { container } = render(<Separator decorative />);
    const separator = container.firstChild as HTMLElement;
    expect(separator).toHaveAttribute('role', 'none');
  });
}); 