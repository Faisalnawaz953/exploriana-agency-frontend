import React, { useRef } from "react"
import { Container, Row, Col, FormGroup, CustomInput } from "reactstrap"
import "../css/reviewsTable.css"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import IconButton from "../components/ui-elements/IconButton"
import { useHistory } from "react-router-dom"
import { MoreVert } from "@material-ui/icons"
import { getLinks, getUserId } from "../redux/selectors"
import { connect } from "react-redux"
import { isEmpty } from "lodash"
import EditPopUp from "../components/ui-elements/EditPopUp"
import {
  getUserLinks,
  deleteUserLink,
  getBookings,
  updateStatus
} from "../dataServices/Services"
import { updateLinks } from "../redux/actions/userActions/userActions"
import { get } from "lodash"
import { useAlert } from "react-alert"
import ApiLoader from "../components/ui-elements/ApiLoader"
import DropDown from "../components/ui-elements/DropDown"

const Booking = ({ updateLinks, userId }) => {
  const history = useHistory()
  const editRef = useRef([])
  const alert = useAlert()
  const [loading, setLoading] = React.useState(false)
  const [links, setLinks] = React.useState([])
  const [status, setStatus] = React.useState("")

  const handleUpdate = async (id, status) => {
    setLoading(true)
    const data = { status: status }

    const res = await updateStatus(id, data)

    const resCode = get(res, "status")
    console.log("linkss", res)

    if (resCode === 200) {
      alert.success(" Updated Status.")
      setLoading(false)
      loadLinks()
    } else {
      setLoading(false)
      alert.error("Error Updating Status.")
    }
  }

  const loadLinks = async () => {
    const linkres = await getBookings(userId)

    const linkresCode = get(linkres, "status")

    if (linkresCode === 200) {
      setLinks(linkres?.data?.booking)
    } else {
      alert.error("Error Loading Bookings.")
    }
  }

  const handleEditPopUp = (index) => {
    if (editRef.current[index].style.display === "block") {
      editRef.current[index].style.display = "none"
    } else {
      editRef.current[index].style.display = "block"

      links.forEach((link, i) => {
        if (index !== i) {
          editRef.current[i].style.display = "none"
        }
      })
    }
  }
  const statuses = [
    { key: "cancelled", value: "cancelled" },
    { key: "confirmed", value: "confirmed" },
    { key: "closed", value: "closed" },
    { key: "pending", value: "pending" }
  ]

  React.useEffect(() => {
    loadLinks()
  }, [])
  return (
    <>
      <Container>
        <Row>
          <div className="mt-3 member text-lg-left  text-md-left text-sm-center text-center">
            All Bookings ({isEmpty(links) ? "0" : links.length})
          </div>
        </Row>
      </Container>

      <Col lg="12" md="12" sm="12" xs="12" className="table_overflow">
        <table className="custom_table">
          <thead>
            <th>
              CNIC
              <ExpandMoreIcon />
            </th>
            <th>
              Persons
              <ExpandMoreIcon />
            </th>

            <th>
              Phone Number
              <ExpandMoreIcon />
            </th>
            <th>
              Actions
              <ExpandMoreIcon />
            </th>
          </thead>
          <tbody>
            {isEmpty(links) && (
              <tr
                className="h4 text-muted pt-5 bg-white "
                style={{ height: "300px" }}
              >
                <td colSpan={2} className="text-center ">
                  No Bookings Added Yet.
                </td>
              </tr>
            )}
            {loading ? (
              <tr className="h4 text-muted pt-5 bg-white ">
                <td colSpan={2} className="text-center ">
                  <ApiLoader />
                </td>
              </tr>
            ) : (
              !isEmpty(links) &&
              links.map((link, index) => (
                <tr key={index}>
                  <td>{link.cnic}</td>
                  <td>{link.persons}</td>
                  <td>{link.phoneNumber}</td>

                  <td className="text-right" style={{ position: "relative" }}>
                    <DropDown
                      type="select"
                      color="white"
                      height="50px"
                      options={statuses}
                      backgroundColor
                      value={link?.status}
                      setValue={(val) => {
                        handleUpdate(link?._id, val)
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Col>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    links: getLinks(state),
    userId: getUserId(state)
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    updateLinks: (links) => {
      dispatch(updateLinks(links))
    }
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Booking)
