import React from "react"
import { Container, Row, Col } from "reactstrap"
import { addPaymentMethod, getSingleUser } from "../../../dataServices/Services"
import { get } from "lodash"
import { useAlert } from "react-alert"
import Loader from "react-loader-spinner"
import { connect } from "react-redux"
import Button from "../../ui-elements/Button"
import { updateUser } from "../../../redux/actions/userActions/userActions"
const Payment = ({ user }) => {
  const alert = useAlert()
  const styles = {
    margin: "0 auto",
    marginTop: "10%"
  }
  const [loading, setLoading] = React.useState(false)

  const connectStripe = async () => {
    setLoading(true)
    const res = await addPaymentMethod()
    const resCode = get(res, "status")

    if (resCode === 200) {
      // setLoading(false);
      window.location = res.data.url
    }
    if (resCode !== 200) {
      setLoading(false)
      alert("NETWORK_ERROR.TRY AGAIN.")
    }
  }

  const getUser = async () => {
    const res = await getSingleUser(user?.user?._id)
    const resCode = get(res, "status")

    if (resCode === 200) {
      updateUser(res?.data?.user)
    }
    if (resCode !== 200) {
      setLoading(false)
      alert("NETWORK_ERROR.TRY AGAIN.")
    }
  }

  React.useEffect(() => {
    getUser()
  }, [])
  return (
    <Container style={styles}>
      <Row>
        <Col md="12" className="text-center">
          <h4>
            <b>Payment</b>
          </h4>
          <p>
            {user.user.stripeAccountId
              ? "Stripe is Connected"
              : "To start earning money, you need to connect your Stripe account."}
          </p>
        </Col>

        {!user.user.stripeAccountId && (
          <Col md="12" className="text-center">
            <Button
              text={
                loading ? (
                  <Loader
                    type="Circles"
                    radius={5}
                    color="#FFF"
                    height={30}
                    width={30}
                  />
                ) : (
                  "Connect"
                )
              }
              width="25rem"
              height="3rem"
              onClick={connectStripe}
            />
          </Col>
        )}
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
const matchDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => {
      dispatch(updateUser(user))
    }
  }
}

export default connect(mapStateToProps, matchDispatchToProps)(Payment)
