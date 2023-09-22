import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";;
import Card from "../Card";

describe("Card component tests", () => {
  test("The spam count is loaded", () => {
    render(<Card label={"SPAM"} value={20} />);

    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("SPAM")).toBeInTheDocument();
  });

  test("High severity attack count is loaded", () => {
    render(<Card label={"HIGH_SEVERITY_ATTACK"} value={20} />);

    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByText("HIGH_SEVERITY_ATTACK")).toBeInTheDocument();
  });
});
