import React from "react";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";
import "../../css/input.css";
import CustomCheckbox from "./CustomCheckBox";

const InputField = ({
  label,
  placeholder,
  type,
  options,
  id,
  height,
  width,
  backgroundColor,
  currency,
  value,
  onChange,
  onBlur,
  touched,
  errors,
  repeat,
  repeatValue,
  setRepeatValue,
  min
}) => {
  if (repeat) {
    return (
      <FormGroup>
        <Label className="my-2">
          {" "}
          <b>{label}</b>{" "}
        </Label>

        <div className="d-flex w-100 align-items-center">
          <CustomCheckbox
            label="repeat"
            value={repeatValue}
            setValue={setRepeatValue}
          />
          <div className="w-100">
            {" "}
            <Input
              className="custom_input my-3 "
              color="#E6F5FE, 70%"
              style={{
                width: width ? width : "",
                height: height ? height : "",
                backgroundColor: backgroundColor && "#F4F4F5"
              }}
              placeholder={placeholder ? placeholder : ""}
              id={id}
              type={type}
              value={value ? value : ""}
              onChange={onChange}
              onBlur={onBlur}
              invalid={touched && errors ? true : false}
            />
            <FormFeedback invalid>{errors}</FormFeedback>
          </div>
        </div>
      </FormGroup>
    );
  }
  if (type === "date") {
    return (
      <FormGroup>
        <Label className="my-2">
          {" "}
          <b>{label}</b>{" "}
        </Label>
        <Input
          className="custom_input my-3 "
          color="#E6F5FE, 70%"
          style={{
            width: width ? width : "",
            height: height ? height : "",
            backgroundColor: backgroundColor && "#F4F4F5"
          }}
          placeholder={placeholder ? placeholder : ""}
          id={id}
          type={type}
          value={value ? value : ""}
          onChange={e => onChange(e.target.value)}
          min={min && min}
        />
      </FormGroup>
    );
  }
  return (
    <FormGroup>
      <Label className="my-2">
        {" "}
        <b>{label}</b>{" "}
      </Label>
      {currency ? (
        <div className="d-flex w-100 align-items-center">
          <div className="h3 text-secondary pr-2">$</div>{" "}
          <div className="w-100">
            {" "}
            <Input
              className="custom_input my-3 "
              color="#E6F5FE, 70%"
              style={{
                width: width ? width : "",
                height: height ? height : "",
                backgroundColor: backgroundColor && "#F4F4F5"
              }}
              placeholder={placeholder ? placeholder : ""}
              id={id}
              type={type}
              value={value ? value : ""}
              onChange={onChange}
              onBlur={onBlur}
              valid={touched && !errors ? true : false}
              invalid={touched && errors ? true : false}
            />
            <FormFeedback valid>Valid</FormFeedback>
            <FormFeedback invalid>{errors}</FormFeedback>
          </div>
        </div>
      ) : (
        <Input
          className="custom_input my-3 "
          color="#E6F5FE, 70%"
          style={{
            width: width ? width : "",
            height: height ? height : "",
            backgroundColor: backgroundColor && "#F4F4F5"
          }}
          placeholder={placeholder ? placeholder : ""}
          id={id}
          type={type}
          value={value ? value : ""}
          onChange={onChange}
          onBlur={onBlur}
          // valid={touched && !errors ? true : false}
          invalid={touched && errors ? true : false}
        />
      )}
      {/* <FormFeedback valid>Valid</FormFeedback> */}
      <FormFeedback invalid>{errors}</FormFeedback>
    </FormGroup>
  );
};

export default InputField;
