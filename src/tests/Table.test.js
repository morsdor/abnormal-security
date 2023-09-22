import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "../Table";

const propData = new Map();

propData.set("evil.com", 12);
propData.set("domain.com", 6);
propData.set("wicked.com", 16);
propData.set("wrong.com", 6);
propData.set("bad.com", 28);

describe("Card component tests", () => {
  test("The table is loaded with correct data", () => {
    render(<Table domainMap={propData} />);

    expect(screen.getByText("evil.com")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("17%")).toBeInTheDocument();

    expect(screen.getByText("wicked.com")).toBeInTheDocument();
    expect(screen.getByText("16")).toBeInTheDocument();
    expect(screen.getByText("23%")).toBeInTheDocument();
  });
});
