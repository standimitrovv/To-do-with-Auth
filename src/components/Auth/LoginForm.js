import classes from './LoginForm.module.css';
import { useRef, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import AuthContext from '../store/auth-context';

const LoginForm = () => {
  const enteredEmail = useRef();
  const enteredPassword = useRef();

  const [hasError, setHasError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const submitFormHandler = (event) => {
    event.preventDefault();

    // Fetch the link for  log in
    const email = enteredEmail.current.value;
    const password = enteredPassword.current.value;
    setIsLoading(true);
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          setIsLoading(false);
          throw new Error('Incorrect email/password');
        } else {
          history.replace('/tasks');
          return res.json();
        }
      })
      .then((data) => authCtx.login(data.idToken, data.email))
      .catch((error) => setHasError(error.message));
  };

  return (
    <section className={classes.section}>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <h1>Login</h1>
        <div className={classes.email}>
          <label htmlFor='email'>Email</label>
          <input type='email' ref={enteredEmail} required></input>
        </div>
        <div className={classes.password}>
          <label htmlFor='password'>Password</label>
          <input type='password' ref={enteredPassword} required></input>
        </div>
        <div className={classes.control}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <button className={classes.btn}>Login</button>
          )}
          {hasError && <p className={classes.error}>{hasError}</p>}
        </div>
        <div className={classes.member}>
          Not a member?
          <Link to='/signup' className={classes.signup}>
            Sing Up
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
