import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import * as z from 'zod';

/**
 * Define a basic validation schema for the test form
 * Requires username to be between 2 and 50 characters
 */
const formSchema = z.object({
  username: z.string().min(2).max(50),
});

/**
 * Test form component that implements:
 * - Form validation using react-hook-form
 * - Basic username field with label and description
 * - Form control wrapper for styling
 */
const TestForm = () => {
  const form = useForm({
    defaultValues: {
      username: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Enter your username</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

describe('Form Component', () => {
  /**
   * Tests the basic rendering of all form components
   * Verifies that the form renders with:
   * - Proper label
   * - Help text/description
   */
  test('renders form with all components', () => {
    render(<TestForm />);
    
    // Verify form elements are present
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByText('Enter your username')).toBeInTheDocument();
  });

  /**
   * Tests form input interaction
   * Verifies that:
   * - Input accepts user typing
   * - Value updates correctly
   */
  test('handles input changes', () => {
    render(<TestForm />);
    
    // Get input and simulate user typing
    const input = screen.getByLabelText('Username');
    fireEvent.change(input, { target: { value: 'testuser' } });
    
    // Verify input value updated
    expect(input).toHaveValue('testuser');
  });

  /**
   * Tests custom styling capabilities
   * Verifies that custom classes are properly applied to:
   * - Form items
   * - Labels
   * - Descriptions
   * - Error messages
   */
  test('displays form components with custom classes', () => {
    render(
      <Form {...useForm()}>
        <FormItem className="custom-item">
          <FormLabel className="custom-label">Test Label</FormLabel>
          <FormDescription className="custom-desc">Test Description</FormDescription>
          <FormMessage className="custom-message">Test Message</FormMessage>
        </FormItem>
      </Form>
    );

    // Verify custom classes are applied
    expect(screen.getByText('Test Label')).toHaveClass('custom-label');
    expect(screen.getByText('Test Description')).toHaveClass('custom-desc');
    expect(screen.getByText('Test Message')).toHaveClass('custom-message');
  });
}); 