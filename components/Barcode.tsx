"use client";

import React from "react";

import { ReactBarcode } from "react-jsbarcode";

const Barcode: React.FC<{
  value: string;
  className: string;
}> = ({ value, className }) => {
  return <ReactBarcode className={className} value={value} options={{
    format: "CODE39",
    background: "transparent",
    displayValue: false,
    width: 3,
    height: 175
  }} />;
};

export default Barcode;
