import { render, fireEvent, screen } from '@testing-library/react';
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

test(('it does not break!'),()=>{
  render(<Carousel
  photos={TEST_IMAGES}/>)
})

test(('it does create snapshot!'), ()=>{
    const {asFragment} = render(<Carousel photos={TEST_IMAGES}/>)
    expect(asFragment()).toMatchSnapshot
})

test(('it do be going forward or backward'),()=>{
  const {asFragment} = render(<Carousel photos={TEST_IMAGES}/>)
  const leftArrow = screen.getByTestId("left-arrow")
  const rightArrow = screen.getByTestId("right-arrow")
  expect(screen.getByAltText("testing image 1")).toBeInTheDocument()
  fireEvent.click(rightArrow)
  expect(screen.getByAltText("testing image 2")).toBeInTheDocument()
  fireEvent.click(leftArrow)
  expect(screen.getByAltText("testing image 1")).toBeInTheDocument()
  // want to make sure currcardIdx goes up or down properly 

})

test(('make sure RIGHT arrow disapears'),()=>{
  const {asFragment} = render(<Carousel photos={TEST_IMAGES}/>)
  const rightArrow = screen.getByTestId("right-arrow")
  fireEvent.click(rightArrow)
  fireEvent.click(rightArrow)
  expect(rightArrow).not.toBeVisible()

})

test(('make sure LEFT arrow disapears'),()=>{
  const {asFragment} = render(<Carousel photos={TEST_IMAGES}/>)
  const leftArrow = screen.getByTestId("left-arrow")
  expect(leftArrow).not.toBeVisible()

})