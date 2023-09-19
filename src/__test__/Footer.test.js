import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/general/Footer';

describe('Footer Component', () => {
  test('Footer snapshot created without errors', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  test.skip('Footer contains 1 paragraph tag', () => {
    const pTag = screen.getByTestId('paragraph');
    expect(pTag).toBe(1)
  });

  test.skip('Footer contains a link to the privacy policy', () => {
    // Your test logic here
  });


});
