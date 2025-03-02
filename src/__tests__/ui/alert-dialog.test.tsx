import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog';

describe('AlertDialog Component', () => {
  /**
   * Main test for the AlertDialog component that verifies:
   * 1. Initial render of the trigger button
   * 2. Opening the dialog by clicking the trigger
   * 3. Presence of all dialog content (title, description, buttons)
   * 4. Interaction with action and cancel buttons
   * 5. Proper callback execution for both actions
   */
  test('renders alert dialog with all components', () => {
    const handleAction = jest.fn();
    const handleCancel = jest.fn();

    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Test Title</AlertDialogTitle>
            <AlertDialogDescription>Test Description</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

    // Verify initial render of trigger button
    expect(screen.getByText('Open Dialog')).toBeInTheDocument();

    // Test dialog opening behavior
    fireEvent.click(screen.getByText('Open Dialog'));

    // Verify all dialog content is rendered correctly
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();

    // Test button interactions and callback execution
    fireEvent.click(screen.getByText('Continue'));
    expect(handleAction).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Cancel'));
    expect(handleCancel).toHaveBeenCalled();
  });

  /**
   * Tests the accessibility feature of closing the dialog with the Escape key
   * 1. Renders the dialog
   * 2. Opens it
   * 3. Simulates Escape key press
   * 4. Verifies dialog is closed
   */
  test('closes on escape key', () => {
    render(
      <AlertDialog>
        <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Test Title</AlertDialogTitle>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    );

    // Open the dialog
    fireEvent.click(screen.getByText('Open Dialog'));
    
    // Simulate Escape key press
    fireEvent.keyDown(document.body, { key: 'Escape' });
    
    // Verify dialog is closed (title should not be visible)
    expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
  });
}); 