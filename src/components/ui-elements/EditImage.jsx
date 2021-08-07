import React from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { BottomNavigation } from '@material-ui/core'
import { BRAND_COLOR } from '../../Constants/Constants'
import { getBrandColor } from '../../redux/selectors'
import { connect } from 'react-redux'

const useStyles = brandColor =>
  makeStyles(theme => ({
    editIcon: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      backgroundColor: brandColor,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'absolute',
      bottom: 10,
      left: '53%',
      border: '4px solid white',
      cursor: 'pointer'
    },
    image: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '120px',
      height: '120px',

      alignSelf: 'center',
      borderRadius: '50%',
      border: '1px solid #F4F4F5',
      backgroundColor: 'rgb(66, 159, 186,0.1)'
    },
    align: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: BRAND_COLOR
    }
  }))
const EditImage = ({ path, setPath, upload, brandColor }) => {
  const classes = useStyles(brandColor)()
  return (
    <div className={classes.align}>
      <div className={classes.image}>
        {' '}
        {path ? (
          <img
            src={path}
            alt='img'
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '50%'
            }}
          />
        ) : (
          <div className={classes.text}>Your logo</div>
        )}
        <div className={classes.editIcon}>
          <label
            style={{ cursor: 'pointer' }}
            className='w-100 h-100 d-flex justify-content-center align-items-center'
          >
            <EditOutlinedIcon className='mt-1' style={{ color: 'white' }} />{' '}
            <input
              onChange={e => {
                if (e.target.files[0] === undefined) {
                  setPath(path)
                } else {
                  upload(e)
                }
              }}
              type='file'
              hidden
            />
          </label>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    brandColor: getBrandColor(state)
  }
}

export default connect(mapStateToProps, null)(EditImage)
