import React, { useEffect } from "react";
import ApiLoader from "../../components/ui-elements/ApiLoader";
import { useAlert } from "react-alert";
import { updateUser } from "../../redux/actions/userActions/userActions";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { getSingleUser } from "../../dataServices/Services";
import { get } from "lodash";

const StripeConnected = ({ location, history, updateUser, user }) => {
  const [loading, setLoading] = React.useState(true);

  const alert = useAlert();

  const fetchSingleUser = async () => {
    const res = await getSingleUser(user.user._id);
    const resCode = get(res, "status");
    console.log(res);

    if (resCode === 200) {
      updateUser(res.data.user);
      history.push("/payment");
    }
    if (resCode !== 200) {
      updateUser(res.data.user);
      alert("NETWORK_ERROR.TRY AGAIN.");
      history.push("/payment");
    }
  };
  useEffect(() => {
    fetchSingleUser();
  }, []);

  return (
    <div>
      <ApiLoader />
    </div>
  );
};

const matchDispatchToProps = dispatch => {
  return {
    updateUser: user => {
      dispatch(updateUser(user));
    }
  };
};
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(StripeConnected);
