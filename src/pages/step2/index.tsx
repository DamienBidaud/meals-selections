import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { availableRestaurant } from "../../root/dishes";
import { useNavigate } from "react-router";
import { formState } from "../../root/form";
import { Container } from "./styles";
import { Button } from "../../styles";

const Step2 = () => {
  const restaurants = useRecoilValue(availableRestaurant);
  const [form, setForm] = useRecoilState(formState);
  const navigate = useNavigate();

  const handleBack = () => {
    setForm({
      ...form,
      restaurant: "",
    });
    navigate("/");
  };

  const handleNext = () => {
    if (form.restaurant === "") {
      alert("No restaurant have been selected");
    } else {
      navigate("/step3");
    }
  };
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({
      ...form,
      restaurant: event.target.value,
    });
  };
  return (
    <Container>
      <h1>Step 2</h1>
      <div>
        <label htmlFor="restaurantList">Select a restaurant</label>
        <select
          name="restaunt"
          id="restaurantList"
          defaultValue={`${form.restaurant}`}
          onChange={handleOnChange}
        >
          <option disabled value="">
            ----
          </option>
          {restaurants.map((restaurant, index) => (
            <option value={`${restaurant}`} key={`${restaurant}-${index}`}>
              {restaurant}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Button onClick={handleBack}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </Container>
  );
};

export default Step2;
