import { FormGroup, Label, Input } from "reactstrap";
import "../../css/input.css";
const DorpDown = ({ type, options, label, width, height, backgroundColor }) => {
  return (
    <div>
      <Label className="my-2">
        {" "}
        <b>{label}</b>{" "}
      </Label>
      <select
        className="select my-3"
        style={{
          width: width ? width : "100%",
          height: height ? height : "",
          paddingLeft: "10px",

          backgroundColor: backgroundColor && "#F4F4F5",
        }}
      >
        {options && options.map((op) => <option>{op.value}</option>)}
      </select>
    </div>
  );
};

export default DorpDown;
