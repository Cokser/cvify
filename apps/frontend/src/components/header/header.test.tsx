import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from './index';

describe('tests', () => {
  it('should', () => {
    render(<Header />);
    expect(screen.getByText('Duude')).toBeInTheDocument();
  })
});
