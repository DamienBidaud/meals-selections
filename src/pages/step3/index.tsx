import React from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { availableDishes } from "../../root/dishes";
import { formState, Meal } from "../../root/form";
import { dropLast, clone, update } from "ramda";
import {
  Container,
  DishContainer,
  DishControlerContainer,
  Form,
} from "./styles";
import { H1, Button } from "../../styles";

const Step3 = () => {
  const navigate = useNavigate();

  const [form, setForm] = useRecoilState(formState);
  const handleBack = () => {
    setForm({ ...form, selectedMeals: [{ meal: "", serving: 1 }] });
    navigate("/step2");
  };
  const dishes = useRecoilValue(availableDishes);
  const handleNext = () => {
    if (
      form.selectedMeals.some(
        ({ meal, serving }) => meal === "" && serving < form.guests
      )
    ) {
      alert("the meal selection is incorect");
    } else {
      const updatedMeals = form.selectedMeals.reduce(
        (acc: Array<Meal>, meal) => {
          if (meal.serving < form.guests) {
            acc.push({ serving: form.guests, meal: meal.meal });
          } else {
            acc.push(meal);
          }

          return acc;
        },
        []
      );
      setForm({
        ...form,
        selectedMeals: updatedMeals,
      });
      navigate("/step4");
    }
  };
  const handleAddDish = () => {
    setForm({
      ...form,
      selectedMeals: form.selectedMeals.concat([{ meal: "", serving: 1 }]),
    });
  };

  const handleRemoveDish = () => {
    if (form.selectedMeals.length > 1) {
      setForm({
        ...form,
        selectedMeals: dropLast(1, form.selectedMeals),
      });
    }
  };

  const handleChangeMeal = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const oldMeal = clone(form.selectedMeals[index]);
    oldMeal.meal = event.target.value;
    setForm({
      ...form,
      selectedMeals: update(index, oldMeal, form.selectedMeals),
    });
  };

  const handleChangeServing = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const oldMeal = clone(form.selectedMeals[index]);
    oldMeal.serving = parseInt(event.target.value, 10);
    setForm({
      ...form,
      selectedMeals: update(index, oldMeal, form.selectedMeals),
    });
  };
  return (
    <Container>
      <H1>Step 3</H1>
      <div>
        {form.selectedMeals.map((meal, index) => (
          <Form key={index}>
            <DishContainer>
              <label htmlFor="dishList">Please select a dish</label>
              <select
                name="dish"
                id="dishList"
                defaultValue={meal.meal}
                onChange={(event) => handleChangeMeal(index, event)}
              >
                <option disabled value="">
                  ----
                </option>
                {dishes.map(({ name }) => (
                  <option
                    value={name}
                    key={name}
                    disabled={form.selectedMeals.some(
                      ({ meal }) => meal === name
                    )}
                  >
                    {name}
                  </option>
                ))}
              </select>
            </DishContainer>
            <div>
              <label htmlFor="serving">Please enter number of serving</label>
              <input
                id="serving"
                type="number"
                min={form.guests}
                max={10}
                defaultValue={
                  meal.serving < form.guests ? form.guests : meal.serving
                }
                onChange={(event) => handleChangeServing(index, event)}
              />
            </div>
            <hr />
          </Form>
        ))}
      </div>
      <DishControlerContainer>
        <Button
          disabled={
            dishes.length === 1 || form.selectedMeals.length === dishes.length
          }
          onClick={handleAddDish}
        >
          +
        </Button>
        <Button
          disabled={form.selectedMeals.length === 1}
          onClick={handleRemoveDish}
        >
          -
        </Button>
      </DishControlerContainer>
      <div>
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </Container>
  );
};

export default Step3;
