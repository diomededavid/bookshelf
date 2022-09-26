/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
// 🐨 you're going to need this:
import * as auth from 'auth-provider'
import {FullPageSpinner} from './components/lib'
import * as colors from './styles/colors'
import {client} from './utils/api-client'
import {useAsync} from './utils/hooks'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }
  return user
}

function App() {
  // 🐨 useState for the user
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  // 🐨 create a login function that calls auth.login then sets the user
  const login = form => auth.login(form).then(user => setData(user))

  // 🐨 create a registration function that does the same as login except for register
  const register = form => auth.register(form).then(user => setData(user))

  // 🐨 create a logout function that calls auth.logout() and sets the user to null
  const logout = () => {
    auth.logout()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return (
      <div>
        css=
        {{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  }
  // 🐨 if there's a user, then render the AuthenticatedApp with the user and logout
  if (isSuccess) {
    return user ? (
      <AuthenticatedApp user={user} logout={logout} />
    ) : (
      <UnauthenticatedApp login={auth.login} register={auth.register} />
    )
  }

  // 🐨 if there's not a user, then render the UnauthenticatedApp with login and register
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
