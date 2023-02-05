import { render, RenderResult, screen, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { atom, RecoilRoot, useRecoilValue } from "recoil";
import Step3 from "../index";
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
    element: <Step3 />,
  },
]);
const formState = atom({
  key: "form",
  default: {
    guests: 3,
    meal: "dinner",
    restaurant: "Mc Donalds",
    selectedMeals: [
      {
        meal: "",
        serving: 1,
      },
    ],
  },
});

const onChange = jest.fn();
describe("Step 3", () => {
  let step3: RenderResult;
  beforeEach(() => {
    step3 = render(
      <RecoilRoot>
        <RouterProvider router={router} />
        <RecoilObserver node={formState} onChange={onChange} />
      </RecoilRoot>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  it("Should match the snapshot", () => {
    const { asFragment } = step3;
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
    userEvent.selectOptions(screen.getByRole("combobox"), "Fries");

    userEvent.click(screen.getByText("Next"));
    expect(onChange).toHaveBeenCalledWith({
      guests: 3,
      meal: "dinner",
      restaurant: "Mc Donalds",
      selectedMeals: [
        {
          meal: "Fries",
          serving: 3,
        },
      ],
    });
    expect(mockNavigate).toHaveBeenCalledWith("/step4");
    expect(alertMock).toHaveBeenCalledTimes(0);
  });
});
