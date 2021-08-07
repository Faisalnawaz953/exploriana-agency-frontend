import React from 'react'
import { Label } from 'reactstrap'
import '../../css/imageupload.css'
import Dropzone from 'react-dropzone'
import VideoSnapshot from 'video-snapshot'
import FileLoader from './FileLoader'
import { makeStyles } from '@material-ui/core/styles'
import { getBrandColor } from '../../redux/selectors'
import { connect } from 'react-redux'

const useStyles = brandColor =>
  makeStyles({
    uploadFile: {
      // borderRadius: '16px',
      // backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='$brandColor' stroke-width='3' stroke-dasharray='4%2c 14' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e")`

      border: `2px solid ${brandColor}`,
      borderStyle: 'dashed',
      borderRadius: '16px'
    }
  })

const ImageUpload = ({
  text,
  files,
  setSelectedFiles,
  video,
  loadingFile,
  brandColor
}) => {
  const classes = useStyles(brandColor)()
  return (
    <>
      <Label>
        {' '}
        <b>{text}</b>
      </Label>
      {/* <div className="imageupload    mt-3">
        <div className=" p-3 d-flex align-items-center flex-column ">
          <p className="uploadTopText">
            Drag your video,{" "}
            <span style={{ fontWeight: "bold", color: brandColor }}>
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
            setSelectedFiles(acceptedFiles)
          }}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div {...getRootProps()} className={`mt-3 ${classes.uploadFile}`}>
              <input {...getInputProps()} accept='video/*' />
              <div className=' p-3 d-flex align-items-center flex-column '>
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <>
                    {' '}
                    <p className='uploadTopText'>
                      Drag your video,{' '}
                      <span style={{ fontWeight: 'bold', color: brandColor }}>
                        click to upload
                      </span>
                    </p>
                    <p className='uploadBottomText'>
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
            setSelectedFiles(acceptedFiles)
          }}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div {...getRootProps()} className='imageupload    mt-3'>
              <input {...getInputProps()} accept='image/*' />
              <div className=' p-3 d-flex align-items-center flex-column '>
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <>
                    {' '}
                    <p className='uploadTopText'>
                      Drag your video,{' '}
                      <span style={{ fontWeight: 'bold', color: brandColor }}>
                        click to upload
                      </span>
                    </p>
                    <p className='uploadBottomText'>
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
  )
}

const mapStateToProps = state => {
  return {
    brandColor: getBrandColor(state)
  }
}

export default connect(mapStateToProps, null)(ImageUpload)
