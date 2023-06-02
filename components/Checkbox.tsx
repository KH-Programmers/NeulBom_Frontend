import React from "react";
import { TbCheck } from "react-icons/tb";
import styled from "styled-components";

export const Checkbox = React.forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">
>(({ ...props }, ref) => {
  return (
    <CheckboxContainer>
      <input
        ref={ref}
        className="peer"
        role="checkbox"
        tabIndex={0}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          opacity: 0,
          width: 0,
          height: 0,
        }}
        type="checkbox"
        {...props}
      />

      <CheckboxDisplay className="peer-focus:ring-2 ring-black ring-offset-2">
        <div className="check w-full h-full flex justify-center items-center">
          <TbCheck size={21} color="#fff" />
        </div>
      </CheckboxDisplay>
    </CheckboxContainer>
  );
});

Checkbox.displayName = "Checkbox";

//#region components

const CheckboxContainer = styled.div`
  width: 20px;
  height: 20px;
  position: relative;
`;

const CheckboxDisplay = styled.div`
  border: 2px solid #000;
  border-radius: 6px;
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
`;

//#endregion
