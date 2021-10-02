import { Switch, Route } from 'react-router-dom';
import React from 'react';
import { Suspense } from 'react';
import { useContext } from 'react';
import AuthContext from './components/store/auth-context';
import LoadingSpinner from './components/UI/LoadingSpinner';

const App = () => {
  const authCtx = useContext(AuthContext);
  const LoginPage = React.lazy(() => import('./components/pages/LoginPage'));
  const SignupPage = React.lazy(() => import('./components/pages/SingupPage'));
  const AppPage = React.lazy(() => import('./components/pages/AppPage'));
  const MyDay = React.lazy(() => import('./components/navigation/MyDay'));
  const Important = React.lazy(() =>
    import('./components/navigation/Important')
  );
  const NewList = React.lazy(() => import('./components/tasks/NewList'));

  return (
    <Suspense
      fallback={
        <div className='text-center'>
          <LoadingSpinner />
        </div>
      }
    >
      <Switch>
        {!authCtx.isLoggedIn && (
          <Route path='/' exact>
            <LoginPage />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path='/signup'>
            <SignupPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='/tasks'>
            <AppPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='/tasks/myday'>
            <MyDay />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='/tasks/important'>
            <Important />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path='/tasks/:newList'>
            <NewList />
          </Route>
        )}
        <Route path='*'>
          <LoginPage />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default App;
