import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';

describe('Card Components', () => {
  test('renders Card with all sub-components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent>Test Content</CardContent>
        <CardFooter>Test Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
    expect(screen.getByText('Test Footer')).toBeInTheDocument();
  });

  test('applies custom className to Card', () => {
    render(
      <Card className="custom-class">
        <CardContent>Content</CardContent>
      </Card>
    );
    const card = screen.getByText('Content').closest('div');
    expect(card).toHaveClass('custom-class');
  });

  test('renders CardHeader with custom className', () => {
    render(
      <Card>
        <CardHeader className="header-class">
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    );
    const header = screen.getByText('Title').closest('div');
    expect(header).toHaveClass('header-class');
  });
}); 