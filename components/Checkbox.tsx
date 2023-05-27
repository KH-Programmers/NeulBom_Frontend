import React from "react";
import { TbCheck } from "react-icons/tb";
import styled from "styled-components";

export const Checkbox: React.FC<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
> = ({ ...props }) => {
  return (
    <CheckboxContainer>
      <input
        role="checkbox"
        tabIndex={0}
        style={{ position: "absolute", left: 0, top: 0, opacity: 0 }}
        type="checkbox"
        {...props}
      />
      <CheckboxDisplay>
        <div className="check w-full h-full flex justify-center items-center">
          <TbCheck size={21} color="#fff" />
        </div>
      </CheckboxDisplay>
    </CheckboxContainer>
  );
};

//#region components

const CheckboxContainer = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
  border: 2px solid #000;
  border-radius: 6px;
`;

const CheckboxDisplay = styled.div`
  transition: background-color ease 0.2s;
  width: 100%;
  height: 100%;

  .check {
    transition: opacity ease 0.2s;
    opacity: 0;
  }

  input[type="checkbox"]:checked + & {
    background: #000;

    .check {
      opacity: 1;
    }
  }

  input:focus + &::after {
    content: "";
    position: absolute;
    left: -6px;
    top: -6px;
    width: 28px;
    height: 28px;
    border: 2px solid #000;
    border-radius: 9px;
  }
`;

//#endregion
