import React from "react";
import { Label } from "reactstrap";
import "../../css/imageupload.css";
import Dropzone from "react-dropzone";
import VideoSnapshot from "video-snapshot";
import FileLoader from "./FileLoader";

const ImageUpload = ({ text, files, setSelectedFiles, video, loadingFile }) => {
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
      {loadingFile ? (
        <FileLoader />
      ) : video ? (
        <Dropzone
          maxFiles={1}
          onDrop={async acceptedFiles => {
            setSelectedFiles(acceptedFiles);
          }}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div {...getRootProps()} className="imageupload    mt-3">
              <input {...getInputProps()} accept="video/*" />
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
                      We accept any and all video files, most commonly .mp4,
                      .mov and .avi.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </Dropzone>
      ) : (
        <Dropzone
          maxFiles={1}
          onDrop={acceptedFiles => {
            setSelectedFiles(acceptedFiles);
          }}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div {...getRootProps()} className="imageupload    mt-3">
              <input {...getInputProps()} accept="image/*" />
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
      )}
    </>
  );
};

export default ImageUpload;
