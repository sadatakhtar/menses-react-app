import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/general/Footer";

describe("Footer Component", () => {
  it("Footer snapshot created without errors", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it("displays the copyright text", () => {
    render(<Footer />);
    const copyrightText = screen.getByText(
      /© 2023 CycleSync. All rights reserved./i
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it.skip("Should render 1 p tag", () => {
    render(<Footer />);
    const pTag = screen.getByRole('p');
    expect(pTag).toBe(1);
  });
});
