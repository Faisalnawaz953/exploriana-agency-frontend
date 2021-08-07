import React from 'react'
import { Container, Row, Col, FormGroup, Label, Form } from 'reactstrap'
import ProfilePic from '../../../assets/images/Ellipse22.png'
import Input from '../../ui-elements/Input'
import DropDown from '../../ui-elements/DropDown'
import Button from '../../ui-elements/Button'
import BrandColorTheme from '../../ui-elements/BrandColorTheme'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { BottomNavigation } from '@material-ui/core'
import EditImage from '../../ui-elements/EditImage'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useAlert } from 'react-alert'
import { addBrand, updateBrandImage } from '../../../dataServices/Services'
import get from 'lodash/get'
import ApiLoader from '../../ui-elements/ApiLoader'
import { getUserId, getBrand } from '../../../redux/selectors'
import {
  updateBrand,
  updateBrandColor
} from '../../../redux/actions/userActions/userActions'
import { connect } from 'react-redux'

const schema = yup.object().shape({
  brandName: yup.string().required('Brand Name is Required')
})

const useStyles = makeStyles(theme => ({
  headText: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '30px',
    /* identical to box height, or 150% */

    letterSpacing: '0.6px',

    color: '#2B2B2B'
  }
}))
const BrandSettings = ({ brand, updateBrand, updateColor }) => {
  const classes = useStyles()
  const alert = useAlert()
  const [currency, setCurrency] = React.useState(
    brand && brand.currency ? brand.currency : 'ind'
  )
  const [colorCode, setColorCode] = React.useState(
    brand && brand.colorCodeHex ? brand.colorCodeHex : '#F2453D'
  )
  const [image, setImage] = React.useState(
    brand && brand.brandLogoUrl ? brand.brandLogoUrl : ''
  )
  const [loading, setLoading] = React.useState(false)
  const option = [
    { key: 'option-1', value: 'ind' },
    { key: 'option-2', value: 'rs' }
  ]
  console.log(localStorage.getItem('BrandColor'))

  const uploadBrandImage = async e => {
    console.log(URL.createObjectURL(e.target.files[0]))
    setImage(URL.createObjectURL(e.target.files[0]))
    let blobImage = await fetch(URL.createObjectURL(e.target.files[0])).then(
      r => r.blob()
    )

    const formData = new FormData()

    formData.append('image', blobImage)

    const res = await updateBrandImage(formData)
    console.log(res)
    const resCode = get(res, 'status')
    if (resCode !== 200) {
      alert.error('Network Error Try Agian')
    }
    if (resCode === 200) {
      updateBrand(res.data.brand)
      alert.success('Brand Image Updated')
    }
  }
  const submitHandler = async values => {
    //TODO
    // uploadImage()
    setLoading(true)
    const data = {
      brandName: values.brandName,
      colorCodeHex: colorCode,
      currency: currency
    }
    //TODO
    // uploadImage()

    const res = await addBrand(data)
    console.log(res)

    const resCode = get(res, 'status')
    if (resCode !== 200) {
      setLoading(false)

      alert.error('Network Error Try Agian')
    }
    if (resCode === 200) {
      localStorage.setItem('BrandColor', colorCode)
      updateColor(colorCode)
      updateBrand(res.data.brand)
      setLoading(false)

      alert.success('Brand Changes Saved SuccessFully')
    }
  }

  return (
    <>
      <Container className='text-center'>
        <Form>
          <Row>
            <Col md={{ size: 12 }}>
              <div className={classes.headText}>Edit Profile</div>
              <EditImage
                path={image}
                setPath={setImage}
                upload={uploadBrandImage}
              />
            </Col>
          </Row>
        </Form>
      </Container>

      <Formik
        initialValues={{
          brandName: brand && brand.brandName ? brand.brandName : ''
        }}
        validationSchema={schema}
        onSubmit={submitHandler}
        enableReinitialize={true}
      >
        {({
          handleChange,
          handleBlur,
          errors,
          values,
          touched,
          handleSubmit
        }) => (
          <Container>
            <Form>
              <Row>
                {loading ? (
                  <Col
                    md={{ size: '8', offset: 2 }}
                    style={{ height: '400px' }}
                    className='d-flex align-items-center justify-content-center'
                  >
                    <ApiLoader />
                  </Col>
                ) : (
                  <>
                    <Col md={{ size: '7', offset: 3 }}>
                      <FormGroup>
                        <Input
                          type='text'
                          label='Brand Name'
                          placeholder='John'
                          height={'50px'}
                          value={values.brandName}
                          onBlur={handleBlur('brandName')}
                          onChange={handleChange('brandName')}
                          touched={touched.brandName}
                          errors={errors.brandName}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={{ size: '7', offset: 3 }}>
                      <FormGroup>
                        <DropDown
                          type='select'
                          options={option}
                          label='Currency'
                          height={'50px'}
                          value={currency}
                          setValue={setCurrency}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={{ size: '8', offset: 3 }}>
                      <BrandColorTheme
                        brandColor={colorCode}
                        setBrandColor={val => setColorCode(val)}
                      />
                    </Col>
                  </>
                )}

                <Col md={{ size: 7, offset: 3 }} className='text-center'>
                  <Button
                    text='Save Changes'
                    width='100%'
                    height='2.5rem'
                    onClick={handleSubmit}
                  />
                </Col>
              </Row>
            </Form>
          </Container>
        )}
      </Formik>
    </>
  )
}

const mapStateToProps = state => {
  return {
    brand: getBrand(state)
  }
}
const matchDispatchToProps = dispatch => {
  return {
    updateBrand: brand => {
      dispatch(updateBrand(brand))
    },
    updateColor: color => {
      dispatch(updateBrandColor(color))
    }
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(BrandSettings)
