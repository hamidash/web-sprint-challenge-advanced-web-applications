import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";
import { fetchBubbles as mockFetchBubbles } from "../helpers/fetchBubbles";

jest.mock('../helpers/fetchBubbles');

const mockData = [
  {
    color: 'aliceblue',
    code: {
      hex: "#f0f8ff"
    },
    id: 1
  },
  {
    color: 'gray',
    code: {
      hex: "#f0f8fg"
    },
    id: 2
  },
  
]

test("Renders BubblePage without errors", () => {
  // Finish this test
  render(<BubblePage/>)
  const colors = screen.getByText(/colors/i);
  const bubbles = screen.getByText(/bubbles/i)

  expect(colors).toBeVisible();
  expect(bubbles).toBeVisible();
});

test("Fetches data and renders the bubbles on mounting", async () => {
  // Finish this test
  mockFetchBubbles.mockResolvedValueOnce(mockData);
  render(<BubblePage/>);
  
  const bubbles = await waitFor(()=>screen.getAllByTestId("circle"))
  expect(bubbles).toHaveLength(1)
});

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading