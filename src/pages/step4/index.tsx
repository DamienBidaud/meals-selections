import React, { Fragment } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import { formState } from "../../root/form";
import { Button } from "../../styles";

const Step4 = () => {
  const form = useRecoilValue(formState);
  const navigate = useNavigate();
  const handlePrevious = () => {
    navigate("/step3");
  };
  return (
    <div>
      <h1>Review</h1>
      <dl>
        <dt>Meal</dt>
        <dd>{form.meal}</dd>
        <dt>Guest(s)</dt>
        <dd>{form.guests}</dd>
        <dt>Restaurant</dt>
        <dd>{form.restaurant}</dd>
        {form.selectedMeals.map(({ meal, serving }) => (
          <Fragment key={meal}>
            <dt>{meal}</dt>
            <dd>{serving}</dd>
          </Fragment>
        ))}
      </dl>
      <Button onClick={handlePrevious}>Back</Button>
    </div>
  );
};

export default Step4;
