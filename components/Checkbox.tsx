import React from "react";
import { TbCheck } from "react-icons/tb";
import styled from "styled-components";

export const Checkbox: React.FC<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
> = ({ ...props }) => {
  return (
    <>
      <CheckboxInput type="checkbox" {...props} />
      <CheckboxDisplay>
        <div className="check w-full h-full flex justify-center items-center">
          <TbCheck size={21} color="#fff" />
        </div>
      </CheckboxDisplay>
    </>
  );
};

//#region components

const CheckboxInput = styled.input`
  display: none;
`;

const CheckboxDisplay = styled.span`
  width: 21px;
  height: 21px;
  border: 2px solid #000;
  border-radius: 6px;
  display: inline-block;
  transition: background-color ease 0.2s;
  overflow: hidden;

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
`;

//#endregion
