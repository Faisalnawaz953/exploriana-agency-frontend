import React from 'react'
import Loader from 'react-loader-spinner'
import '../../App.css'
import { connect } from 'react-redux'
import { getBrandColor } from '../../redux/selectors'
function FileLoader({ brandColor }) {
  return (
    <div className='loader '>
      <Loader
        type='Circles'
        radius={5}
        color={brandColor}
        height={40}
        width={40}
      />
    </div>
  )
}
const mapStateToProps = state => {
  return {
    brandColor: getBrandColor(state)
  }
}

export default connect(mapStateToProps, null)(FileLoader)
