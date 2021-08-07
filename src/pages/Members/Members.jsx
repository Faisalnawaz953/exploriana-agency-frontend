import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import DorpDown from '../../components/ui-elements/DropDown'
import '../../css/Members.css'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import EmailIcon from '@material-ui/icons/Email'

import { useHistory } from 'react-router-dom'
import { getAllUsers } from '../../dataServices/Services'
import { connect } from 'react-redux'
import MessageModal from '../../components/ui-elements/MessageModal'
import { handleEditPopUp } from '../../config/GlobalFunctions'

const Members = ({ loggedUser }) => {
  const history = useHistory()
  const options = [
    {
      key: 'option-1',
      value: 'All'
    },
    {
      key: 'option-2',
      value: 'Newest'
    },
    {
      key: 'option-3',
      value: 'Old'
    }
  ]

  const [users, setUsers] = React.useState([])
  const messageRef = React.useRef([])
  const loadAllUsers = async () => {
    const res = await getAllUsers()
    console.log(res)
    setUsers(res.data.users)
  }
  React.useEffect(() => {
    loadAllUsers()
  }, [])
  return (
    <>
      <Container>
        <Row>
          <div className='mt-3 all_member text-lg-left  text-md-left text-sm-center text-center'>
            All Members (100)
          </div>

          <div className='  '>
            <Row>
              <div className='p-1'>
                <DorpDown
                  color='white'
                  type='select'
                  options={options}
                  label='Category'
                  width='200px'
                  height='2.5rem'
                />
              </div>
              <div className='p-1'>
                <DorpDown
                  color='white'
                  type='select'
                  options={options}
                  label='Status'
                  width='200px'
                  height='2.5rem'
                />
              </div>
              <div className='p-1'>
                <DorpDown
                  color='white'
                  type='select'
                  options={options}
                  label='Priority'
                  width='200px'
                  height='2.5rem'
                />
              </div>
            </Row>
          </div>
        </Row>
      </Container>
      <div className='table_overflow'>
        <table className='custom_table  '>
          <thead>
            <th>
              name
              <ExpandMoreIcon />
            </th>
            <th>
              Category <ExpandMoreIcon />
            </th>
            <th>
              Last activity <ExpandMoreIcon />
            </th>
            <th>
              Priority <ExpandMoreIcon />
            </th>
            <th>
              Status <ExpandMoreIcon />
            </th>
          </thead>
          <tbody>
            {users.map((user, i) => {
              // if (user?.email === loggedUser?.user?.email) {
              //   return
              // }

              return (
                <tr style={{ position: 'relative' }}>
                  <td>
                    <p>
                      <ul style={{ listStyle: 'none' }} className='p-0'>
                        <li> {user.email}</li>
                        <li></li>
                      </ul>
                    </p>
                  </td>
                  <td>Membership</td>
                  <td>18 days ago</td>
                  <td className='high'>HIGH</td>
                  <td>Active</td>
                  <td>
                    <EmailIcon
                      style={{
                        background: 'rgba(16, 195, 235, 0.06)',
                        padding: '5px',
                        color: 'rgba(66, 159, 186, 0.89)',
                        width: '50px',
                        height: '40px',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                      // onClick={e => {

                      // }}
                      onClick={() => handleEditPopUp(messageRef, i, users)}
                    />
                    <div
                      style={{
                        display: 'none',
                        position: 'absolute',
                        top: 15,
                        right: 90,
                        zIndex: 7
                      }}
                      ref={el => (messageRef.current[i] = el)}
                    >
                      <MessageModal
                        onClose={() => handleEditPopUp(messageRef, i, users)}
                        sender={loggedUser?.user}
                        receiver={user}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}{' '}
          </tbody>
        </table>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  const { user } = state
  return {
    loggedUser: user
  }
}

export default connect(mapStateToProps, null)(Members)
