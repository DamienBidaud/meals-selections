import React from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { MEALS } from "../../constants/meals";
import { formState } from "../../root/form";
import { Step1Button, Container } from "./styles";
import { H1 } from "../../styles";
const Step1 = () => {
  const [form, setForm] = useRecoilState(formState);
  const navigate = useNavigate();
  const handleOnChangeMeal = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      meal: event.target.value,
    });
  };

  const handleOnChangeGuest = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      guests: parseInt(event.target.value, 10),
    });
  };

  const handleNext = () => {
    if (form.meal === "") {
      alert("The meal haven't been selected");
    } else {
      navigate("/step2");
    }
  };

  return (
    <Container>
      <H1>Step 1</H1>
      <div>
        <label htmlFor="meal">Select a meal</label>
        <select
          id="meal"
          onChange={handleOnChangeMeal}
          defaultValue={form.meal}
          required
        >
          <option disabled value="">
            ----
          </option>
          {MEALS.map((meal, index) => (
            <option key={`${meal}-${index}`} value={meal}>
              {meal}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="guest">Number of guest</label>
        <input
          id="guest"
          type="number"
          min="1"
          max="10"
          defaultValue={1}
          onChange={handleOnChangeGuest}
          required
        />
      </div>
      <Step1Button date-testid="step1-next-button" onClick={handleNext}>Next</Step1Button>
    </Container>
  );
};

export default Step1;
