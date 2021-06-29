import { Label } from "reactstrap";
import "../../css/imageupload.css";
import Dropzone from "react-dropzone";

const ImageUpload = ({ text }) => {
  return (
    <>
      <Label>
        {" "}
        <b>{text}</b>
      </Label>
      {/* <div className="imageupload    mt-3">
        <div className=" p-3 d-flex align-items-center flex-column ">
          <p className="uploadTopText">
            Drag your video,{" "}
            <span style={{ fontWeight: "bold", color: "#429FBA" }}>
              click to upload
            </span>
          </p>
          <p>
            If no image is provided, the first frame of the video will be used.
          </p>
        </div>
      </div> */}
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="imageupload    mt-3">
            <input {...getInputProps()} />
            <div className=" p-3 d-flex align-items-center flex-column ">
              <p className="uploadTopText">
                Drag your video,{" "}
                <span style={{ fontWeight: "bold", color: "#429FBA" }}>
                  click to upload
                </span>
              </p>
              <p className="uploadBottomText">
                If no image is provided, the first frame of the video will be
                used.
              </p>
            </div>
          </div>
        )}
      </Dropzone>
    </>
  );
};

export default ImageUpload;
