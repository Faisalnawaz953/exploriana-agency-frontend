import React from 'react'
import Loader from 'react-loader-spinner'
import { connect } from 'react-redux'
import '../../App.css'
import { getBrandColor } from '../../redux/selectors'
function ApiLoader({ brandColor }) {
  return (
    <div className='loader '>
      <Loader
        type='Puff'
        radius={5}
        color={brandColor}
        height={70}
        width={70}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    brandColor: getBrandColor(state)
  }
}

export default connect(mapStateToProps, null)(ApiLoader)
