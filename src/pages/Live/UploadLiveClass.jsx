import React, { useState, useRef } from 'react'

import {
  Container,
  Row,
  Col,
  Form,
  CustomInput,
  Modal,
  ModalBody
} from 'reactstrap'
import BackButton from '../../components/ui-elements/BackButton'
import Input from '../../components/ui-elements/Input'
import Tags from '../../components/ui-elements/Tags'
import ImageUpload from '../../components/ui-elements/ImageUpload'
import DorpDown from '../../components/ui-elements/DropDown'
import UploadedImage from '../../components/ui-elements/UploadedImage'
import Button from '../../components/ui-elements/Button'
import { useHistory } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import { Formik } from 'formik'
import * as yup from 'yup'
import RadioButton from '../../components/ui-elements/RadioButton'
import CustomCheckBox from '../../components/ui-elements/CustomCheckBox'
import { isEmpty, get, add } from 'lodash'
import { addLiveClass, updateImage } from '../../dataServices/Services'
import { useAlert } from 'react-alert'
import ApiLoader from '../../components/ui-elements/ApiLoader'
import TextButton from '../../components/ui-elements/TextButton'
import LocationPopUp from '../../components/ui-elements/LocationPopUp'
import { width } from '@material-ui/system'
import { formatBytes } from '../../config/GlobalFunctions'

const liveClassSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  notes: yup.string().required('Notes is required'),
  price: yup
    .number()
    .required('Price is required')
    .typeError('Enter Price in numbers'),
  startTime: yup.string().required('Enter Starting Time')
})
const UploadLiveClass = (props) => {
  const [visibility, setVisibility] = useState('Draft')

  const [trainer, setTrainer] = useState('Martin')
  const [length, setLength] = useState(3)
  const [date, setDate] = useState('')

  const alert = useAlert()

  const history = useHistory()
  const options = [
    { key: 3, value: '3-days' },
    { key: 4, value: '4-days' },
    { key: 5, value: '5-days' },
    { key: 7, value: '7-days' }
  ]
  const Trainer = [
    { key: 'Anna Martin', value: ' Anna Martin' },
    { key: 'abc', value: ' Anna Martin' },
    { key: 'avb', value: ' xyz' },
    { key: 'ddfd', value: ' abc xyz' }
  ]

  const [extras, setExtras] = useState([' musical night', 'Bar BQ'])

  const [selectedExtras, setSelectedExtras] = useState([])

  const [clicked, setClicked] = useState(false)
  const [coverImage, setCoverImage] = useState('')

  const [loading, setLoading] = useState()

  const [imageSize, setImageSize] = useState('')
  const [imageName, setImageName] = useState('')
  const [loadingImage, setLoadingImage] = React.useState(false)
  const [daysPlan, setDaysPlan] = useState([])
  const [fromPlaces, setFromPlaces] = useState([])
  const [toPlaces, setToPlaces] = useState([])
  const [fromCity, setFromCity] = useState()
  const [toCity, setToCity] = useState()

  const uploadCoverImage = async (acceptedFiles) => {
    setLoadingImage(true)
    const size = formatBytes(acceptedFiles[0].size)
    setImageSize(size)
    setImageName(acceptedFiles[0].name)
    let url = URL.createObjectURL(acceptedFiles[0])

    let blob = await fetch(url).then((r) => r.blob())
    const formData = new FormData()

    formData.append('image', blob)

    const res = await updateImage(formData)
    console.log(res)
    const resCode = get(res, 'status')
    if (resCode !== 200) {
      setLoadingImage(false)
      alert.error('Network Error Try Agian')
    }
    if (resCode === 200) {
      setLoadingImage(false)
      setCoverImage(res.data.imageUrl)
      alert.success('Cover Image Added')
    }
  }

  const daysPlanner = (length) => {
    const arr = []
    for (let i = 0; i < Number(length); i++) {
      arr.push(i)
    }

    let plans = arr.map((val, i) => (
      <Input
        type='textarea'
        label={`Day ${i + 1} Plan`}
        color='white'
        height='80px'
        placeholder={`Details about day ${i + 1} Plan`}
        backgroundColor
        value={daysPlan[i]}
        onChange={(e) => {
          plans = [...daysPlan]
          plans[i] = e.target.value
          setDaysPlan(plans)
        }}
      />
    ))
    return plans
  }

  const uploadLiveClass = async (values) => {
    setLoading(true)
    const imageDetails = {
      name: imageName,
      size: imageSize
    }
    const data = {
      title: values.title,
      description: values.description,
      imageDetails: imageDetails,
      fromCity: fromPlaces,
      toCity: toPlaces,
      days: length,
      daysPlan: daysPlan,
      guide: trainer,
      price: values.price,
      startDate: date,
      startTime: values.startTime,
      visibility: visibility,
      notes: values.notes,
      bannerImage: coverImage,
      extras: selectedExtras
    }
    const res = await addLiveClass(data)
    console.log(res)

    const resCode = get(res, 'status')
    if (resCode !== 200) {
      setLoading(false)
      alert.error('Network Error Try Agian')
    }
    if (resCode === 200) {
      values.title = ''
      values.price = ''
      values.description = ''
      values.notes = ''
      values.startTime = ''

      setClicked(false)
      setCoverImage('')
      setLoading(false)
      alert.success('Trip Added Successfully.')
    }
  }

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        notes: '',
        price: '',
        startTime: ''
      }}
      validationSchema={liveClassSchema}
      onSubmit={(values) => {
        if (isEmpty(selectedExtras) || coverImage === '') {
          setClicked(true)
        } else {
          uploadLiveClass(values)
        }
      }}
    >
      {(props) => {
        const {
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          handleSubmit
        } = props
        return (
          <>
            <BackButton title='Back' onClick={() => history.push('/trips')} />
            <Container className='text-center'>
              <Form>
                <Row>
                  <Col md={{ size: 12 }}>
                    <h3>
                      <b>Create Trip</b>
                    </h3>
                  </Col>
                </Row>
              </Form>
            </Container>
            <Container>
              <Form className='  my-5'>
                <Row form className='  mb-5'>
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
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          label='Title'
                          color='white'
                          height='50px'
                          placeholder='Enter title'
                          backgroundColor
                          value={values.title}
                          onBlur={handleBlur('title')}
                          onChange={handleChange('title')}
                          touched={touched.title}
                          errors={errors.title}
                        />
                        <Input
                          type='textarea'
                          label='Description '
                          color='white'
                          height='80px'
                          placeholder='Details about your trip'
                          backgroundColor
                          value={values.description}
                          onBlur={handleBlur('description')}
                          onChange={handleChange('description')}
                          touched={touched.description}
                          errors={errors.description}
                        />
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          label='From City'
                          type='input'
                          placeholder='From places'
                          color='white'
                          height='50px'
                          backgroundColor
                          value={fromCity}
                          onChange={(e) => {
                            setFromCity(e.target.value)
                          }}
                        />
                        <Tags
                          tags={fromPlaces}
                          setTags={setFromPlaces}
                          selected
                          selectedTags={[]}
                          setSelectedTags={() => {}}
                        />
                        <div style={{ marginTop: '-20px' }}>
                          <Button
                            text={'Add'}
                            height='2.5rem'
                            onClick={() => {
                              setFromCity('')
                              const arr = [...fromPlaces]
                              arr.push(fromCity)
                              setFromPlaces(arr)
                            }}
                          />
                        </div>
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          label='To City'
                          type='input'
                          placeholder='To City'
                          color='white'
                          height='50px'
                          backgroundColor
                          value={toCity}
                          onChange={(e) => setToCity(e.target.value)}
                        />
                        <Tags
                          tags={toPlaces}
                          setTags={setToPlaces}
                          selected
                          selectedTags={[]}
                          setSelectedTags={() => {}}
                        />
                        <div style={{ marginTop: '-20px' }}>
                          <Button
                            text={'Add'}
                            height='2.5rem'
                            onClick={() => {
                              setToCity('')
                              const arr = [...toPlaces]
                              arr.push(toCity)
                              setToPlaces(arr)
                            }}
                          />
                        </div>
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <DorpDown
                          type='select'
                          label='Tour Days'
                          color='white'
                          height='50px'
                          backgroundColor
                          options={options}
                          value={length}
                          setValue={setLength}
                        />
                        {daysPlanner(length)}
                      </Col>
                      <Col md={{ size: 4, offset: 2 }}>
                        <DorpDown
                          type='select'
                          label='Guide'
                          type='select'
                          color='white'
                          height='50px'
                          options={Trainer}
                          backgroundColor
                          value={trainer}
                          setValue={setTrainer}
                        />
                      </Col>

                      <Col md={{ size: 4 }}>
                        <Input
                          label='price'
                          type='text'
                          placeholder='1234'
                          color='white'
                          height='50px'
                          backgroundColor
                          value={values.price}
                          onBlur={handleBlur('price')}
                          onChange={handleChange('price')}
                          touched={touched.price}
                          errors={errors.price}
                        />
                      </Col>

                      <Col md={{ size: 4, offset: 2 }}>
                        <Input
                          label='Date'
                          type='date'
                          color='white'
                          height='50px'
                          backgroundColor
                          value={date}
                          onChange={setDate}
                        />
                        {clicked && date === '' && (
                          <div className='text-danger'>Enter Date For Trip</div>
                        )}
                      </Col>
                      <Col md={{ size: 4 }}>
                        <Input
                          label='Start Time'
                          type='time'
                          placeholder='Details about your Class'
                          color='white'
                          height='50px'
                          backgroundColor
                          value={values.startTime}
                          onBlur={handleBlur('startTime')}
                          onChange={handleChange('startTime')}
                          touched={touched.startTime}
                          errors={errors.startTime}
                        />
                      </Col>

                      <Col md={{ size: 8, offset: 2 }}>
                        <Input
                          label='Notes (optional)'
                          type='textarea'
                          placeholder='Enter Notes'
                          color='white'
                          height='80px'
                          backgroundColor
                          value={values.notes}
                          onBlur={handleBlur('notes')}
                          onChange={handleChange('notes')}
                          touched={touched.notes}
                          errors={errors.notes}
                        />
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <ImageUpload
                          text='Upload Banner'
                          setSelectedFiles={uploadCoverImage}
                          loadingFile={loadingImage}
                        />
                        {coverImage !== '' && (
                          <UploadedImage
                            url={coverImage}
                            name={imageName}
                            size={imageSize}
                          />
                        )}
                        {clicked && coverImage === '' && (
                          <div className='text-danger'>
                            Banner Image is required
                          </div>
                        )}
                      </Col>

                      <Col md={{ size: 8, offset: 2 }}>
                        <b>Extras</b>
                      </Col>
                      <Col md={{ size: 8, offset: 2 }}>
                        <Tags
                          newTag
                          tags={extras}
                          setTags={setExtras}
                          selectedTags={selectedExtras}
                          setSelectedTags={setSelectedExtras}
                        />
                      </Col>

                      <Col md={{ size: 8, offset: 2 }}>
                        <b>Visibility</b>
                      </Col>
                      <Col md={{ size: 8, offset: 2 }} className='mt-3'>
                        <Row className='pl-3'>
                          <RadioButton
                            label='Draft'
                            value={visibility}
                            setValue={setVisibility}
                          />
                          <RadioButton
                            label='Publish'
                            value={visibility}
                            setValue={setVisibility}
                          />
                        </Row>
                      </Col>
                    </>
                  )}
                  <Col md={{ size: 8, offset: 2 }} className='text-center mb-5'>
                    <Button
                      text={'Upload Trip'}
                      width='100%'
                      height='2.5rem'
                      onClick={handleSubmit}
                    />
                  </Col>
                </Row>
              </Form>
            </Container>
          </>
        )
      }}
    </Formik>
  )
}

export default UploadLiveClass
