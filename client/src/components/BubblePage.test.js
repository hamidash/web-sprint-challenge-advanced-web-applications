import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";

import { fetchBubbles as mockFetchBubbles } from "../api/fetchBubbles";

jest.mock("../api/fetchBubbles");

const mockData = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff",
    },
    id: 1,
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc",
    },
    id: 2,
  },
];

test("Fetches data and renders the bubbles", () => {
  // Finish this test
  mockFetchBubbles.mockResolvedValueOnce(mockData);
  const {queryAllByTestId} = render(<BubblePage/>);
  const bubbles = queryAllByTestId("circle");
  expect(bubbles.toHaveLength(1));
});
