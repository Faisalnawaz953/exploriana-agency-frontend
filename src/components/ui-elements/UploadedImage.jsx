import React from "react";
import "../../css/uploadedImage.css";
import ProfilePic from "../../assets/images/Rectangle 1350.png";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const UploadedImage = ({ name, size, url }) => {
  return (
    <div className="uploadedImage p-3 my-3 d-flex justify-content-between">
      <div className="img-text">
        <tr>
          <td>
            <img
              style={{ width: "50px", height: "50px", borderRadius: "5px" }}
              src={url ? url : ProfilePic}
            />
          </td>
          <td>
            <p>
              {name ? name : "Cardio Blast.mp4"}
              <br />
              {size ? size : "211MB"}
            </p>
          </td>
        </tr>
      </div>
      <div className="mt-3">
        <DeleteOutlineIcon />
      </div>
    </div>
  );
};

export default UploadedImage;
