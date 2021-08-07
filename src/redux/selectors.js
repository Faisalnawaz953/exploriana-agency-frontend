export const getUserAuth = state => state.user.auth
export const getBrand = state => state.user.brand
export const getUserId = state => state.user.user._id
export const getNotificationSettings = state => state.user.notificationsSetting
export const getLandingPageData = state => state.user.landingPage
export const getLinks = state => state.user.links
export const getChallenges = state => state.user.challenges
export const getLiveClasses = state => state.user.liveClasses
export const getVideos = state => state.user.videos
export const getClassrooms = state => state.user.classrooms
export const getBrandColor = state => state.user.brandColor || '#429FBA'
