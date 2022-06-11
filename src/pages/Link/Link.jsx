import React, { useRef } from "react"
import { Container, Row, Col, FormGroup, CustomInput } from "reactstrap"
import "../../css/reviewsTable.css"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import IconButton from "../../components/ui-elements/IconButton"
import { useHistory } from "react-router-dom"
import { MoreVert } from "@material-ui/icons"
import { getLinks } from "../../redux/selectors"
import { connect } from "react-redux"
import { isEmpty } from "lodash"
import EditPopUp from "../../components/ui-elements/EditPopUp"
import { getUserLinks, deleteUserLink } from "../../dataServices/Services"
import { updateLinks } from "../../redux/actions/userActions/userActions"
import { get } from "lodash"
import { useAlert } from "react-alert"
import ApiLoader from "../../components/ui-elements/ApiLoader"

const AllLink = ({ links, updateLinks }) => {
  const history = useHistory()
  const editRef = useRef([])
  const alert = useAlert()
  const [loading, setLoading] = React.useState(false)

  const deleteLink = async (id) => {
    setLoading(true)
    const res = await deleteUserLink(id)

    const resCode = get(res, "status")
    console.log("linkss", res)

    if (resCode === 200) {
      setLoading(false)
      loadLinks()
    } else {
      setLoading(false)
      alert.error("Error Loading Links.")
    }
  }

  const loadLinks = async () => {
    const linkres = await getUserLinks()

    const linkresCode = get(linkres, "status")
    console.log("linkss", linkres)

    if (linkresCode === 200) {
      updateLinks(linkres.data.links)
    } else {
      alert.error("Error Loading Links.")
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

  React.useEffect(() => {
    loadLinks()
  }, [])
  return (
    <>
      <Container>
        <Row>
          <div className="mt-3 member text-lg-left  text-md-left text-sm-center text-center">
            All Guides ({isEmpty(links) ? "0" : links.length})
          </div>

          <div className="ml-auto ">
            <IconButton
              title="Add New Guide"
              onClick={() => {
                history.push("/add-guide")
              }}
            />
          </div>
        </Row>
      </Container>

      <Col lg="12" md="12" sm="12" xs="12" className="table_overflow">
        <table className="custom_table">
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
              Email
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
                  No Links Added Yet.
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
                  <td>{link.firstName}</td>
                  <td>{link.lastName}</td>
                  <td>{link.email}</td>
                  <td>{link.phoneNumber}</td>
                  <td className="text-right" style={{ position: "relative" }}>
                    <MoreVert
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEditPopUp(index)}
                    />
                    <div
                      style={{
                        display: "none",
                        position: "absolute",
                        top: 20,
                        right: 40,
                        zIndex: 9
                      }}
                      ref={(el) => (editRef.current[index] = el)}
                    >
                      <EditPopUp
                        onEdit={() => history.push(`/edit-guide/${link._id}`)}
                        onDelete={() => deleteLink(link._id)}
                      />
                    </div>
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
    links: getLinks(state)
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
    updateLinks: (links) => {
      dispatch(updateLinks(links))
    }
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(AllLink)
