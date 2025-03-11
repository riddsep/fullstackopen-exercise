import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Note from "./Note";
import { expect } from "vitest";

test("renders content", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const mockHandler = vi.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("make not important");
  await user.click(button);

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );

  screen.debug(element);
  expect(mockHandler.mock.calls).toHaveLength(1);
});
