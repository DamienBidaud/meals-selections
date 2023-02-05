import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import { useEffect } from "react";
import { RecoilRoot, useRecoilValue } from "recoil";
import Step1 from "../index";
import { formState } from "../../../root/form";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as routerFunction from "react-router";
import userEvent from "@testing-library/user-event";

//@ts-ignore
export const RecoilObserver = ({ node, onChange }) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};

const mockNavigate = jest.fn();
const mockUseNavigate = jest.spyOn(routerFunction, "useNavigate");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Step1 />,
  },
]);

const onChange = jest.fn();
describe("Step 1", () => {
  let step1: RenderResult;
  beforeEach(() => {
    step1 = render(
      <RecoilRoot>
        <RouterProvider router={router} />
        <RecoilObserver node={formState} onChange={onChange} />
      </RecoilRoot>
    );
  });
  it("Should match the snapshot", () => {
    const { asFragment } = step1;
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should not navagitate when no restaurant have been selected", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    mockUseNavigate.mockReturnValue(mockNavigate);

    userEvent.click(screen.getByText("Next"));
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledTimes(1);
  });

  it("Should navigate when a restaurant have been selected", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    mockUseNavigate.mockReturnValue(mockNavigate);
    userEvent.selectOptions(screen.getByRole("combobox"), "dinner");
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: 3 }}); // works perfect

    userEvent.click(screen.getByText("Next"));
    expect(onChange).toHaveBeenCalledWith({
      guests: 3,
      meal: "dinner",
      restaurant: "",
      selectedMeals: [
        {
          meal: "",
          serving: 1,
        },
      ],
    });
    expect(mockNavigate).toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledTimes(0);
  });
});
