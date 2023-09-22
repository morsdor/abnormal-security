import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import App from "../App";

// Mock the fetch function to simulate API calls

describe("App component", () => {
  test("test the customer list is loaded and customer can be selected", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () =>
        Promise.resolve([
          {
            name: "Adams - Keeling",
            id: "adams_keeling",
          },
          {
            name: "Greenfelder Group",
            id: "greenfelder_group",
          },
          {
            name: "Greenfelder LLC",
            id: "greenfelder_llc",
          },
        ]),
    });

    render(<App />);

    const plsSelect = screen.getByText("please select");
    expect(plsSelect).toBeInTheDocument();

    expect(screen.getByRole("option", { name: "please select" }).selected).toBe(
      true
    );

    await waitFor(() => {
      const customerName1 = screen.getByText("Adams - Keeling");
      const customerName2 = screen.getByText("Greenfelder Group");
      const customerName3 = screen.getByText("Greenfelder LLC");
      expect(customerName1).toBeInTheDocument();
      expect(customerName2).toBeInTheDocument();
      expect(customerName3).toBeInTheDocument();

      userEvent.selectOptions(
        screen.getByRole("combobox"),
        screen.getByRole("option", { name: "Greenfelder Group" })
      );
      expect(
        screen.getByRole("option", { name: "Greenfelder Group" }).selected
      ).toBe(true);
    });
  });
});
