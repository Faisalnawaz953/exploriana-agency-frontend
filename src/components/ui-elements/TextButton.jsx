import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Classess from '../../pages/Library/Classes/Classess'
import { getBrandColor } from '../../redux/selectors'
import { connect } from 'react-redux'

const useStyles = brandColor =>
  makeStyles(theme => ({
    root: {
      color: brandColor,

      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'auto',
      height: '30px',
      padding: '10px',
      '&:hover': {
        backgroundColor: 'rgb(66, 159, 186,0.1)',
        borderRadius: '20px'
      }
    }
  }))
function TextButton({ label, marginRight, onClick, brandColor }) {
  const classes = useStyles(brandColor)()
  return (
    <div
      className={classes.root}
      style={{ marginRight: marginRight ? marginRight : '' }}
      onClick={onClick}
    >
      {label}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    brandColor: getBrandColor(state)
  }
}

export default connect(mapStateToProps, null)(TextButton)
