import styled from "styled-components";
import { Button } from "../../styles";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-row-gap: 16px;
  grid-column-gap: 16px;
`;

export const Step1Button = styled(Button)`
  grid-row: 3;
  
`;
