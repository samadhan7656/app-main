import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Toast, ToastAction } from '../../components/ui/toast';

describe('Toast Component', () => {
  test('renders toast with title and description', () => {
    render(
      <Toast>
        <div className="grid gap-1">
          <div className="text-sm font-semibold">Test Title</div>
          <div className="text-sm opacity-90">Test Description</div>
        </div>
      </Toast>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  test('renders toast with action button', () => {
    const handleAction = jest.fn();
    render(
      <Toast>
        <div>Toast Content</div>
        <ToastAction altText="Try again" onClick={handleAction}>
          Try again
        </ToastAction>
      </Toast>
    );

    expect(screen.getByText('Try again')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Try again'));
    expect(handleAction).toHaveBeenCalled();
  });

  test('applies variant classes correctly', () => {
    render(
      <Toast variant="destructive">
        <div>Destructive Toast</div>
      </Toast>
    );
    const toast = screen.getByText('Destructive Toast').closest('div[role="alert"]');
    expect(toast).toHaveClass('destructive');
  });
}); 