import { FormGroup, Label, Input } from "reactstrap";
import "../../css/input.css";
const DropDown = ({
  type,
  options,
  label,
  width,
  height,
  backgroundColor,
  onChange,
  value,
}) => {
  return (
    <div>
      <Label className="my-2">
        {" "}
        <b>{label}</b>{" "}
      </Label>
      <select
        className="select my-3"
        value={value}
        onChange={onChange}
        style={{
          width: width ? width : "100%",
          height: height ? height : "",
          paddingLeft: "10px",

          backgroundColor: backgroundColor && "#F4F4F5",
        }}
      >
        {options &&
          options.map((op) => <option key={op.key}>{op.value}</option>)}
      </select>
    </div>
  );
};

export default DropDown;
