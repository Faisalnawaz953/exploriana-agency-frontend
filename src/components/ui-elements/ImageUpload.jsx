import { Label } from "reactstrap";
import "../../css/imageupload.css";
import Dropzone from "react-dropzone";

const ImageUpload = ({ text, files, setFiles }) => {
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
      <Dropzone
        maxFiles={1}
        onDrop={async (acceptedFiles) => {
          let url = URL.createObjectURL(acceptedFiles[0]);
          let blob = await fetch(url).then((r) => r.blob());
          let file = [...files];
          file.push(blob);

          setFiles(file);
        }}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div {...getRootProps()} className="imageupload    mt-3">
            <input {...getInputProps()} />
            <div className=" p-3 d-flex align-items-center flex-column ">
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <>
                  {" "}
                  <p className="uploadTopText">
                    Drag your video,{" "}
                    <span style={{ fontWeight: "bold", color: "#429FBA" }}>
                      click to upload
                    </span>
                  </p>
                  <p className="uploadBottomText">
                    If no image is provided, the first frame of the video will
                    be used.
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </Dropzone>
    </>
  );
};

export default ImageUpload;
