import React from 'react'
import Loader from 'react-loader-spinner'
import '../../App.css'
import { getBrandColor } from '../../redux/selectors'
import { connect } from 'react-redux'

function PageLoading({ brandColor }) {
  return (
    <div className='spinner'>
      <Loader
        type='BallTriangle'
        radius={5}
        color={brandColor}
        height={170}
        width={170}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    brandColor: getBrandColor(state)
  }
}

export default connect(mapStateToProps, null)(PageLoading)
