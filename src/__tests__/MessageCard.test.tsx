import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessageCard from '../components/MessageCard';

describe('MessageCard Component', () => {
  test('renders message card correctly', () => {
    const mockMessage = {
      id: '1',
      content: 'Test message',
      timestamp: new Date().toISOString(),
      sender: 'Test User'
    };
    
    render(<MessageCard message={mockMessage} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  test('handles empty message gracefully', () => {
    const mockMessage = {
      id: '2',
      content: '',
      timestamp: new Date().toISOString(),
      sender: 'Test User'
    };
    
    render(<MessageCard message={mockMessage} />);
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });
}); 