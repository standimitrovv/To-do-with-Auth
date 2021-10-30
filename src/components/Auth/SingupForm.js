import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './SignupForm.module.css';

const SignupForm = () => {
  const enteredEmail = useRef();
  const enteredPassword = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const history = useHistory();

  const submitFormHandler = (event) => {
    event.preventDefault();
    const email = enteredEmail.current.value;
    const password = enteredPassword.current.value;

    if ((!email.includes('@') && password.length === 0) || password.length < 7)
      return setHasError(
        "Email should include '@' and password should be more than 7 characters long"
      );

    setIsLoading(true);
    // Fetch the signup link
    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTLAaJ8Kjj352BYYYsTgEd2rPhCW7oPxU',
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
          throw new Error('User already exists');
        } else {
          history.replace('/');
          return res.json();
        }
      })
      .then((data) => console.log(data))
      .catch((error) => setHasError(error.message));
  };

  return (
    <section className={classes.section}>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <h1>Sign up</h1>
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
            <button className={classes.btn}>Signup</button>
          )}
          {hasError && <p className={classes.error}>{hasError}</p>}
        </div>
      </form>
    </section>
  );
};

export default SignupForm;
