import React from "react";
import { useState } from "react";
import { Container, Col, Row } from "reactstrap";
import SingleEmailNotification from "../../ui-elements/SingleEmailNotification";
import Button from "../../ui-elements/Button";
import { useAlert } from "react-alert";
import ApiLoader from "../../ui-elements/ApiLoader";
import get from "lodash/get";
import { updateNotificationSettings } from "../../../dataServices/Services";
import { updateNotificationSettings as updateNotifications } from "../../../redux/actions/userActions/userActions";
import { connect } from "react-redux";
import { getNotificationSettings } from "../../../redux/selectors";

const EmailNotification = ({ updateNotifications, settings }) => {
  // const [email, setEmail] = useState(Notification);
  const alert = useAlert();
  const [signUp, setSignUp] = useState(
    settings && settings.signUp ? settings.signUp : false
  );
  const [classBooking, setClassBooking] = useState(
    settings && settings.classBooking ? settings.classBooking : false
  );
  const [workout, setWorkOut] = useState(
    settings && settings.workout ? settings.workout : false
  );
  const [classReminder, setClassReminder] = useState(
    settings && settings.classReminder ? settings.classReminder : false
  );
  const [inbox, setInbox] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    setLoading(true);
    const data = {
      signUp: signUp,
      classReminder: classReminder,
      classBooking: classBooking,
      workout: workout,
      inbox: inbox
    };
    const res = await updateNotificationSettings(data);
    console.log(res);

    const resCode = get(res, "status");
    if (resCode !== 200) {
      setLoading(false);

      alert.error("Network Error Try Agian");
    }
    if (resCode === 200) {
      updateNotifications(res.data.notification);
      setLoading(false);

      alert.success("Notification Settings Updated");
    }
  };
  return (
    <>
      <Container className="text-center">
        <Row>
          <Col md={{ size: 12 }}>
            <p
              style={{
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "30px",

                letterSpacing: "0.6px",

                color: "#2B2B2B"
              }}
            >
              Email notifications
            </p>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          {loading ? (
            <Col
              md={{ size: "8", offset: 2 }}
              style={{ height: "200px" }}
              className="d-flex align-items-center justify-content-center"
            >
              <ApiLoader />
            </Col>
          ) : (
            <Col md={{ size: 8, offset: 2 }}>
              <SingleEmailNotification
                label={"Recelve an email each time a member signs up"}
                checked={signUp}
                setChecked={setSignUp}
              />{" "}
              <SingleEmailNotification
                label={
                  "Recelve an email each time a member completes a live class booking"
                }
                checked={classBooking}
                setChecked={setClassBooking}
              />{" "}
              <SingleEmailNotification
                label={
                  "Recelve an email each time a member completes a workout"
                }
                checked={workout}
                setChecked={setWorkOut}
              />{" "}
              <SingleEmailNotification
                label={
                  "Receive a 1-hour email reminder before a live class starts"
                }
                checked={classReminder}
                setChecked={setClassReminder}
              />{" "}
              <SingleEmailNotification
                label={"Receive an email for new inbox messages"}
                checked={inbox}
                setChecked={setInbox}
              />
            </Col>
          )}
          <Col md={{ size: 8, offset: 2 }}>
            <Button
              text="Save Changes "
              width="100%"
              onClick={onSave}
              height="2.5rem"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = state => {
  return {
    settings: getNotificationSettings(state)
  };
};
const matchDispatchToProps = dispatch => {
  return {
    updateNotifications: settings => {
      dispatch(updateNotifications(settings));
    }
  };
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(EmailNotification);
