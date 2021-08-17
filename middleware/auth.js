export default function ({ redirect, store }) {
  // eslint-disable-next-line
  const isAuthenticated = store.state.user ? true : false
  if (!isAuthenticated) {
    redirect({ name: 'auth' })
  }
}
