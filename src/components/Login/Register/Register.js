import React, { useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const [loginData, setLoginData] = useState({});

    const { user, registerUser, signInWithGoogle, isLoading, authError } = useAuth();

    const location = useLocation();
    const history = useHistory();

    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        setLoginData(newLoginData);
    }

    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('Your Password did not match. Please enter your password correctly');
            return
        }
        registerUser(loginData.email, loginData.password, loginData.name, history);
        e.preventDefault();
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle(location, history);
    }
    return (
        <div className="login">
            <div className="login-container">
                <div className="container">
                    <br />
                    {!isLoading &&
                        <form onSubmit={handleLoginSubmit}>
                            <h2 className="mt-3 text-center"><i className="fas fa-sign-in-alt"></i>  Please Register</h2>
                            <br />
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"><i className="fas fa-user"></i> Your Name</label>
                                <div className="col-sm-10">
                                    <input
                                        className="form-control bg-secondary text-white"
                                        id="inputName"
                                        name="name"
                                        onBlur={handleOnBlur}
                                        placeholder="Enter Your Email"
                                        required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label"><i className="far fa-envelope"></i> Your Email</label>
                                <div className="col-sm-10">
                                    <input
                                        type="email"
                                        className="form-control bg-secondary text-white"
                                        id="inputEmail3"
                                        name="email"
                                        onBlur={handleOnBlur}
                                        placeholder="Enter Your Email"
                                        required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label"><i className="fas fa-key"></i> Your Password</label>
                                <div className="col-sm-10">
                                    <input
                                        type="password"
                                        className="form-control bg-secondary text-white"
                                        id="inputPassword2"
                                        name="password"
                                        onBlur={handleOnBlur}
                                        placeholder="Enter Your Password"
                                        required />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className="col-sm-2 col-form-label"><i className="fas fa-key"></i> Retype Password</label>
                                <div className="col-sm-10">
                                    <input
                                        type="password"
                                        className="form-control bg-secondary text-white"
                                        id="inputPassword3"
                                        name="password2"
                                        onBlur={handleOnBlur}
                                        placeholder="Your Password"
                                        required />
                                </div>
                            </div>
                            <div className="p-3">
                                <input
                                    className="btn btn-success text-left px-5"
                                    type="submit"
                                    value="Register" />
                                <Link to="/login">
                                    <button className="btn btn-primary ms-3 px-5">Already Registered? Please Login.</button>
                                </Link>
                            </div>
                        </form>
                    }
                    <br />
                    {isLoading &&
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
                    {user?.email &&
                        <Alert variant="success">
                            User Created Successfully!
                        </Alert>
                    }
                    {authError &&
                        <Alert variant="danger">
                            {authError}
                        </Alert>
                    }

                    <br />
                    <hr />
                    <hr />
                    <br />
                    <div className="App">
                        <button onClick={handleGoogleSignIn} className="btn btn-danger me-4"><i className="fab fa-google"></i> Sign In With Google Account</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;