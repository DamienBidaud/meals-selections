import { atom } from "recoil";

type Form = {
  meal: string;
  guests: number;
  restaurant: string;
  selectedMeals: Array<Meal>;
};

export type Meal = { meal: string; serving: number };

export const formState = atom<Form>({
  key: "form",
  default: {
    meal: "",
    guests: 1,
    restaurant: "",
    selectedMeals: [
      {
        meal: "",
        serving: 1,
      },
    ],
  },
});
