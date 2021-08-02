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
  getUserClassRooms,
  getUserVideos
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
    //Videos api
    const videores = await getUserVideos();

    const videoresCode = get(videores, "status");

    if (videoresCode === 200) {
      dispatch(updateVideos(videores.data.videos));
    } else {
      dispatch(updateVideos([]));
    }
    // get ClassRoom api
    const classres = await getUserClassRooms();

    const classresCode = get(classres, "status");
    console.log("classes", classres);

    if (classresCode === 200) {
      dispatch(updateClassrooms(classres.data.classrooms));
    } else {
      dispatch(updateClassrooms([]));
    }
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
