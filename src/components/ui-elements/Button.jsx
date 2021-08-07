import React from 'react'
import { Button } from 'reactstrap'
import '../../assets/css/button.css'
import { BRAND_COLOR } from '../../Constants/Constants'
import { connect } from 'react-redux'
import { getBrandColor } from '../../redux/selectors'

const CustomButton = ({
  width,
  height,
  text,
  onClick,
  link,
  marginBottom,
  marginTop,
  brandColor
}) => {
  return (
    <>
      {link ? (
        <button
          className='custom_buttom_design mt-4 '
          style={{ width: width ? width : '', height: height ? height : '' }}
        >
          {text}
        </button>
      ) : (
        <Button
          onClick={onClick}
          className='custom_buttom_design mt-4 '
          style={{
            width: width ? width : '',
            height: height ? height : '',
            backgroundColor: brandColor
          }}
        >
          {' '}
          {text}
        </Button>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    brandColor: getBrandColor(state)
  }
}

export default connect(mapStateToProps, null)(CustomButton)
