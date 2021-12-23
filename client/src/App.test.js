import { render, screen } from '@testing-library/react';
// import App from './';
import Landing from './components/Landing';
import PruebaTest from './components/PruebaTest';




// test('renders learn react link', () => {
//   render(<PruebaTest />);//<div><a href="/about">About ℹ️</a></div>
//   const aboutAnchorNode = screen.getByText(/about/i)
//   expect(aboutAnchorNode).toBeInTheDocument();
//   console.log(aboutAnchorNode)
// });

describe('PruebaTest', () => {
  it('renders appropriately', () => {
    render(<PruebaTest/>)
    expect(screen.getByText(/chat/i)).toBeInTheDocument()
  })
 })