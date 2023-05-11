import React from "react";
import { getByTestId, render, screen } from "@testing-library/react";
import App from "./App";

test("renders the course name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(/Clipped!/i);
    expect(linkElement).toBeInTheDocument();
});

test("check Filter a to z", () => {
    render(<App />);
    const button = screen.getByTestId("A-Z");
    expect(button).toBeInTheDocument();
});
