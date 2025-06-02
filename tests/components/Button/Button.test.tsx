import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '@/components/Button/Button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('custom-button--primary');
    expect(button).toHaveClass('custom-button--medium');
    expect(button).not.toBeDisabled();
  });

  it('renders with custom variant and size', () => {
    render(
      <Button variant="secondary" size="large">
        Custom Button
      </Button>
    );
    
    const button = screen.getByText('Custom Button');
    expect(button).toHaveClass('custom-button--secondary');
    expect(button).toHaveClass('custom-button--large');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    const button = screen.getByText('Click me');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
  });
}); 