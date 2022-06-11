import React, { useState } from "react"
import { Container, Row, Col, Table } from "reactstrap"
import "../../../../css/customTable.css"
import IconButton from "../../../ui-elements/IconButton"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import EmailIcon from "@material-ui/icons/Email"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { useHistory } from "react-router-dom"
import {
  deleteSingleTrainer,
  getTrainers
} from "../../../../dataServices/Services"
import { updateTrainers } from "../../../../redux/actions/userActions/userActions"
import { connect } from "react-redux"
import { get, isEmpty } from "lodash"
import EditPopUp from "../../../ui-elements/EditPopUp"
import ApiLoader from "../../../ui-elements/ApiLoader"
import { handleEditPopUp } from "../../../../config/GlobalFunctions"
import { getAllTrainers } from "../../../../redux/selectors"
import { useAlert } from "react-alert"
import MessageModal from "../../../ui-elements/MessageModal"

const AddTrainer = ({ updateTrainers, trainers, loggedUser }) => {
  const alert = useAlert()
  const history = useHistory()
  const [loading, setLoading] = useState(false)
  const messageRef = React.useRef([])
  const editRef = React.useRef([])
  const deleteTrainer = async (id) => {
    setLoading(true)
    const res = await deleteSingleTrainer(id)

    const resCode = get(res, "status")
    console.log("linkss", res)

    if (resCode === 200) {
      setLoading(false)
      loadTrainers()
      alert.error("SuccessFully Deleted User.")
    } else {
      setLoading(false)
      alert.error("Error")
    }
  }
  const loadTrainers = async () => {
    setLoading(true)
    const res = await getTrainers()
    const resCode = get(res, "status")
    console.log("res123", res)

    if (resCode === 200) {
      updateTrainers(res.data.trainers)
    } else {
      alert.error("Error Loading Challenges.")
    }
    setLoading(false)
  }
  React.useEffect(() => {
    loadTrainers()
  }, [])
  console.log(trainers)
  return (
    <>
      <Container>
        <Row>
          <Col md="10">
            <h4 className="mt-3  text-lg-left  text-md-left text-sm-center text-center">
              Users
            </h4>
          </Col>

          <IconButton
            title="Add User"
            onClick={(e) => {
              e.preventDefault()
              history.push("/add-user-info")
            }}
          />
        </Row>
      </Container>
      <div className="table_overflow">
        <table className="custom_table  ">
          <thead>
            <th>
              First Name
              <ExpandMoreIcon />
            </th>
            <th>
              Last Name
              <ExpandMoreIcon />
            </th>
            <th>
              Email <ExpandMoreIcon />
            </th>
            <th>
              About <ExpandMoreIcon />
            </th>
            <th>
              Actions <ExpandMoreIcon />
            </th>
            <th>
              Message <ExpandMoreIcon />
            </th>
          </thead>
          <tbody>
            {isEmpty(trainers) && (
              <tr className="h4 text-muted pt-5 bg-white ">
                <td colSpan={6} className="text-center ">
                  No Users Added Yet.
                </td>
              </tr>
            )}
            {loading ? (
              <tr className="h4 text-muted pt-5 bg-white ">
                <td colSpan={6} className="text-center ">
                  <ApiLoader />
                </td>
              </tr>
            ) : (
              !isEmpty(trainers) &&
              trainers.map((trainer, index) => (
                <tr>
                  <td>{trainer?.firstName}</td>

                  <td>{trainer?.lastName}</td>

                  <td>{trainer?.email}</td>
                  <td>{trainer?.about}</td>

                  <td style={{ position: "relative" }}>
                    <MoreVertIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditPopUp(editRef, index, trainers)}
                    />
                    <div
                      style={{
                        display: "none",
                        position: "absolute",
                        top: 20,
                        right: 75,
                        zIndex: 9
                      }}
                      ref={(el) => (editRef.current[index] = el)}
                    >
                      <EditPopUp
                        onEdit={() => history.push(`/edit-user/${trainer._id}`)}
                        onDelete={() => deleteTrainer(trainer._id)}
                      />
                    </div>
                  </td>
                  <td>
                    <EmailIcon
                      style={{
                        background: "rgba(16, 195, 235, 0.06)",
                        padding: "5px",
                        color: "rgba(66, 159, 186, 0.89)",
                        width: "50px",
                        height: "40px",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                      // onClick={e => {

                      // }}
                      onClick={() =>
                        handleEditPopUp(messageRef, index, trainers)
                      }
                    />
                    <div
                      style={{
                        display: "none",
                        position: "absolute",
                        top: 15,
                        right: 90,
                        zIndex: 7
                      }}
                      ref={(el) => (messageRef.current[index] = el)}
                    >
                      <MessageModal
                        onClose={() =>
                          handleEditPopUp(messageRef, index, trainers)
                        }
                        sender={loggedUser?.user}
                        receiver={trainer}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const { user } = state

  return {
    trainers: getAllTrainers(state),
    loggedUser: user
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    updateTrainers: (trainers) => {
      dispatch(updateTrainers(trainers))
    }
  }
}
export default connect(mapStateToProps, matchDispatchToProps)(AddTrainer)
