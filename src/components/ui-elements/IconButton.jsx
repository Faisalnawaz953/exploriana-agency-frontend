import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/Add'
import { getBrandColor } from '../../redux/selectors'
import { connect } from 'react-redux'

const useStyles = brandColor =>
  makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
      backgroundColor: brandColor,
      borderRadius: '20px!important',
      color: 'white',
      textTransform: 'capitalize',
      '&:hover': {
        background: brandColor
      }
    }
  }))

function IconButton({ title, onClick, brandColor }) {
  const classes = useStyles(brandColor)()

  return (
    <div>
      <Button
        onClick={onClick}
        variant='contained'
        color=' '
        className={classes.button}
        startIcon={<AddIcon />}
        size='large'
      >
        {title}
      </Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    brandColor: getBrandColor(state)
  }
}

export default connect(mapStateToProps, null)(IconButton)
