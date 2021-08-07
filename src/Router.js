import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import Spinner from './components/ui-elements/Spinner'
import Layout from './components/Layout/Layout'
import AuthLayout from './components/AuthLayout/AuthLayout'
import { Redirect } from 'react-router-dom'
import { getBrandColor, getUserAuth } from './redux/selectors'
import { connect } from 'react-redux'
import { getBrandById } from './dataServices/Services'

const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const LoginSuccess = lazy(() => import('./pages/auth/LoginSuccess'))
const RegisterSuccess = lazy(() => import('./pages/auth/RegisterSuccess'))
const LetsGetKnow = lazy(() => import('./pages/auth/LetsGetKnow'))
const Profile = lazy(() => import('./pages/Profile/Profile'))
const Membership = lazy(() =>
  import('./components/Profile/Membership/Membership')
)
const Payment = lazy(() => import('./components/Profile/Payment/Payment'))
const lndingPage = lazy(() =>
  import('./components/Profile/LandingPage/LandingPage')
)
const Home = lazy(() => import('./pages/Home/Home'))
const Inbox = lazy(() => import('./pages/Messages/Inbox'))
const AddLink = lazy(() => import('./pages/Link/AddLink'))
const AddTrainerInfo = lazy(() =>
  import('./components/Profile/Settings/Trainer/AddTrainerInfo')
)
const MemberFullInfo = lazy(() => import('./pages/Members/MemberFullInfo'))
const UploadClasses = lazy(() =>
  import('./pages/Library/Classes/UploadClasses')
)
const Classess = lazy(() => import('./pages/Library/Classes/Classess'))
const Reviews = lazy(() => import('./components/Profile/Reviews/Reviews'))
const Videos = lazy(() => import('./pages/Library/Videos/Videos'))
const UploadVideos = lazy(() => import('./pages/Library/Videos/UploadVideos'))
const Challenges = lazy(() => import('./pages/Challenges/Challenges'))
const UploadChallenges = lazy(() =>
  import('./pages/Challenges/UploadChallenges')
)
const UploadLiveClass = lazy(() => import('./pages/Live/UploadLiveClass'))
const LiveInPersonClass = lazy(() => import('./pages/Link/LiveInPersonClass'))
const AllModals = lazy(() => import('./components/ui-elements/AllModals'))
const Link = lazy(() => import('./pages/Link/Link'))
const Live = lazy(() => import('./pages/Live/Live'))
const Members = lazy(() => import('./pages/Members/Members'))
const TrainerInfo = lazy(() =>
  import('./components/Profile/Settings/Trainer/TrainerInfo')
)
const Auth = lazy(() => import('./pages/auth/Auth'))
const RegisterAuth = lazy(() => import('./pages/auth/RegisterAuth'))
const EditLink = lazy(() => import('./pages/Link/EditLink'))
const EditChallenge = lazy(() => import('./pages/Challenges/EditChallenge'))
const EditLiveClass = lazy(() => import('./pages/Live/EditLiveClass'))
const EditVideo = lazy(() => import('./pages/Library/Videos/EditVideo'))
const EditClass = lazy(() => import('./pages/Library/Classes/EditClass'))
const StripeConnected = lazy(() =>
  import('./components/Profile/StripeConnected')
)

const RouteConfig = ({
  component: Component,
  fullLayout,
  auth,
  brandColor,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        const token = localStorage.getItem('token')
        // console.log("token", token);

        return (
          <>
            {/* {console.log("authth", auth)} */}
            {fullLayout ? (
              <AuthLayout {...props}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </AuthLayout>
            ) : token ? (
              <Layout {...props} brandColor={brandColor}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </Layout>
            ) : (
              <Redirect
                to={{
                  pathname: '/login'
                }}
              />
            )}
          </>
        )
      }}
    />
  )
}

const mapStateToProps = state => {
  return {
    auth: getUserAuth(state),
    brandColor: getBrandColor(state)
  }
}

const AppRoute = connect(mapStateToProps, null)(RouteConfig)

export default function Router() {
  // const PrivateRoute = ({ component: Component, ...rest }) => (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       Auth.getAuth() ? (
  //         <Component {...props} />
  //       ) : (
  //         <Redirect
  //           to={{
  //             pathname: "/",
  //           }}
  //         />
  //       )
  //     }
  //   />
  // );

  return (
    <Switch>
      <AppRoute exact path='/auth' component={Auth} fullLayout />
      <AppRoute path='/register-auth' fullLayout component={RegisterAuth} />
      <AppRoute exact path='/login' fullLayout component={Login} />
      <AppRoute path='/register' fullLayout component={Register} />
      <AppRoute path='/login-success' fullLayout component={LoginSuccess} />
      <AppRoute
        path='/Register-success'
        fullLayout
        component={RegisterSuccess}
      />
      <AppRoute path='/user' fullLayout component={LetsGetKnow} />
      <AppRoute path='/profile' component={Profile} />
      <AppRoute path='/membership' component={Membership} />
      <AppRoute path='/payment' component={Payment} />
      <AppRoute path='/landing-page' component={lndingPage} />
      <AppRoute path='/inbox' component={Inbox} />
      <AppRoute path='/add-link' component={AddLink} />
      <AppRoute path='/add-trainer-info' component={AddTrainerInfo} />
      <AppRoute path='/trainer-info' component={TrainerInfo} />
      <AppRoute path='/reviews' component={Reviews} />
      <AppRoute path='/members' exact component={Members} />
      <AppRoute path='/Member-full-info' exact component={MemberFullInfo} />
      <AppRoute path='/classes' exact component={Classess} />
      <AppRoute path='/live' component={Live} />
      <AppRoute path='/upload-classes' component={UploadClasses} />
      <AppRoute path='/videos' component={Videos} />
      <AppRoute path='/upload-videos' component={UploadVideos} />
      <AppRoute path='/challenges' component={Challenges} />
      <AppRoute path='/upload-challenges' component={UploadChallenges} />
      <AppRoute path='/upload-live-class' component={UploadLiveClass} />
      <AppRoute path='/live-in-person-class' component={LiveInPersonClass} />
      <AppRoute path='/all-modal' component={AllModals} />
      <AppRoute path='/link' component={Link} />
      <AppRoute path='/live' component={Live} />
      <AppRoute exact path='/' component={Home} />
      <AppRoute path='/edit-link/:id' component={EditLink} />
      <AppRoute path='/edit-challenge/:id' component={EditChallenge} />
      <AppRoute path='/edit-live-class/:id' component={EditLiveClass} />
      <AppRoute path='/edit-video/:id' component={EditVideo} />
      <AppRoute path='/edit-class/:id' component={EditClass} />
      <AppRoute path='/stripe-connect' component={StripeConnected} />
    </Switch>
  )
}
