import React from 'react';
import { render, screen } from '@testing-library/react';
import  Login  from './components/Login';

test('renders learn react link', () => {
  render(<Login />);
  const linkElement = screen.getByText(/Don't have an account? Sign Up/i);
  expect(linkElement).toBeInTheDocument();
});
