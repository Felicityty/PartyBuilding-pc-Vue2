const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  addRoute: state => state.permission.addRoute,
  fullRoute: state => state.permission.fullRoute,
  branchOptions: state => state.option.branchOptions,
  classOptions: state => state.option.classOptions
}
export default getters
