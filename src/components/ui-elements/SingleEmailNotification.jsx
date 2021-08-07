import '../../css/switch.css'
import React from 'react'
import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { connect } from 'react-redux'
import { getBrandColor } from '../../redux/selectors'

const SingleEmailNotification = ({
  id,
  label,
  checked,
  setChecked,
  brandColor
}) => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true
  })
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }
  const MySwitch = withStyles({
    switchBase: {
      color: '#B0B0B0',

      '&$checked': {
        color: brandColor
      },
      '&$checked + $track': {
        backgroundColor: '#dedede'
      }
    },
    checked: {},
    track: {
      backgroundColor: '#dedede'
    }
  })(Switch)
  return (
    <div className='d-flex justify-content-between align-items-center border-bottom'>
      <div
        style={{
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '14px',
          letterSpacing: '0.2px'
        }}
      >
        {label}
      </div>

      <FormControlLabel
        control={
          <MySwitch
            checked={checked}
            onChange={() => setChecked(!checked)}
            name='label'
          />
        }
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    brandColor: getBrandColor(state)
  }
}

export default connect(mapStateToProps, null)(SingleEmailNotification)
