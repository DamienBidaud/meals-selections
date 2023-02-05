import { render, RenderResult, screen, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { atom, RecoilRoot, useRecoilValue } from "recoil";
import Step4 from "../index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//@ts-ignore
export const RecoilObserver = ({ node, onChange }) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Step4 />,
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
          meal: "Fries",
          serving: 3,
        },
      ],
  },
});

const onChange = jest.fn();
describe("Step 4", () => {
  let step4: RenderResult;
  beforeEach(() => {
    step4 = render(
      <RecoilRoot>
        <RouterProvider router={router} />
        <RecoilObserver node={formState} onChange={onChange} />
      </RecoilRoot>
    );
  });

  it("Should match the snapshot", () => {
    const { asFragment } = step4;
    expect(asFragment()).toMatchSnapshot();
  });
});
