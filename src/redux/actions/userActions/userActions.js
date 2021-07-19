import {
  LOGIN_SUCCESS,
  UPDATE_USER,
  UPDATE_BRAND,
  UPDATE_NOTIFICATIONS_SETTINGS,
  UPDATE_LANDING_PAGE,
  UPDATE_LINKS,
  UPDATE_CHALLENGES,
  UPDATE_LIVE_CLASSES,
  UPDATE_VIDEOS,
  UPDATE_CLASSROOMS
} from "../../../Constants/Constants";
import {
  getBrandById,
  getNotificationSettingsById,
  getLandingPageById,
  getUserLinks
} from "../../../dataServices/Services";
import get from "lodash/get";

export const updateLinks = payload => {
  return dispatch => {
    dispatch({ type: UPDATE_LINKS, payload });
  };
};
export const updateLanding = payload => {
  return dispatch => {
    dispatch({ type: UPDATE_LANDING_PAGE, payload });
  };
};
export const updateNotificationSettings = payload => {
  return dispatch => {
    dispatch({ type: UPDATE_NOTIFICATIONS_SETTINGS, payload });
  };
};
export const updateBrand = payload => {
  return dispatch => {
    dispatch({ type: UPDATE_BRAND, payload });
  };
};
export const loginUser = payload => {
  return dispatch => {
    dispatch({ type: LOGIN_SUCCESS, payload });
  };
};

export const updateChallenges = payload => {
  return dispatch => {
    dispatch({ type: UPDATE_CHALLENGES, payload });
  };
};
export const updateLiveClasses = payload => {
  return dispatch => {
    dispatch({ type: UPDATE_LIVE_CLASSES, payload });
  };
};
export const updateVideos = payload => {
  return dispatch => {
    dispatch({ type: UPDATE_VIDEOS, payload });
  };
};
export const updateClassrooms = payload => {
  return dispatch => {
    dispatch({ type: UPDATE_CLASSROOMS, payload });
  };
};
export const login = payload => {
  return async dispatch => {
    // console.log(payload);
    //get links api
    // const linkres = await getUserLinks();

    // const linkresCode = get(linkres, "status");
    // console.log("linkss", linkres);

    // if (linkresCode === 200) {
    //   dispatch(updateLinks(linkres.data.links));
    // } else {
    //   dispatch(updateLinks([]));
    // }
    //landing page api
    const landingres = await getLandingPageById(payload._id);

    const landingresCode = get(landingres, "status");
    if (landingresCode === 200) {
      dispatch(updateLanding(landingres.data.landing));
    } else {
      dispatch(updateLanding({}));
    }

    //notification setting api
    const notificationres = await getNotificationSettingsById(payload._id);

    const notificationresCode = get(notificationres, "status");
    if (notificationresCode === 200) {
      dispatch(updateNotificationSettings(notificationres.data.settings));
    } else {
      dispatch(updateNotificationSettings({}));
    }

    // Brand api
    const brandres = await getBrandById(payload._id);

    const brandresCode = get(brandres, "status");
    if (brandresCode === 200) {
      dispatch(updateBrand(brandres.data.brand));
    } else {
      dispatch(updateBrand({}));
    }
    dispatch(loginUser(payload));
  };
};
export const updateUser = payload => {
  return dispatch => {
    dispatch({ type: UPDATE_USER, payload });
  };
};
