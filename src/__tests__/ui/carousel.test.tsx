import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../components/ui/carousel';

/**
 * Mock implementation of the Embla Carousel library
 * Provides basic carousel functionality for testing:
 * - Mock scroll methods
 * - Navigation state management
 */
jest.mock('embla-carousel-react', () => ({
  useEmblaCarousel: () => [
    jest.fn(),
    {
      scrollNext: jest.fn(),
      scrollPrev: jest.fn(),
      canScrollNext: () => true,
      canScrollPrev: () => true,
    },
  ],
}));

describe('Carousel Component', () => {
  /**
   * Tests the basic rendering of carousel items
   * Verifies that all carousel items are properly rendered
   * and visible in the document
   */
  test('renders carousel with items', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Item 1</CarouselItem>
          <CarouselItem>Item 2</CarouselItem>
          <CarouselItem>Item 3</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );

    // Verify all items are rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  /**
   * Tests the presence and accessibility of navigation buttons
   * Ensures both Previous and Next buttons are rendered
   * and properly labeled for accessibility
   */
  test('renders navigation buttons', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Test Item</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );

    // Verify navigation buttons are present and accessible
    expect(screen.getByRole('button', { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });

  /**
   * Tests the interaction with navigation buttons
   * Verifies that clicking Previous and Next buttons:
   * 1. Doesn't cause errors
   * 2. Buttons remain in the document after clicking
   * Note: Actual scrolling behavior is handled by the mocked Embla Carousel
   */
  test('handles navigation button clicks', () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Test Item</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );

    // Get navigation buttons
    const prevButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    // Test button interactions
    fireEvent.click(prevButton);
    fireEvent.click(nextButton);
    
    // Verify buttons remain in document after interactions
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });
}); 