import { Button } from "reactstrap";
import "../../assets/css/button.css";

const CustomButton = ({ width, height, text, onClick, link }) => {
  return (
    <>
      {link ? (
        <button
          className="custom_buttom_design mt-4 "
          style={{ width: width ? width : "", height: height ? height : "" }}
        >
          {text}
        </button>
      ) : (
        <Button
          onClick={onClick}
          className="custom_buttom_design mt-4 "
          style={{ width: width ? width : "", height: height ? height : "" }}
        >
          {" "}
          {text}
        </Button>
      )}
    </>
  );
};

export default CustomButton;
