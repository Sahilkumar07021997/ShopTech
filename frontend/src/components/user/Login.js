import React, { Fragment, useEffect, useState } from "react";
import { Link,useHistory, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import { useAlert } from 'react-alert'
import  {login, clearErrors} from '../../actions/userActions'


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location= useLocation(); //instead of useHistory--useNAvigate is used
    
    const { isAuthenticated, error, loading } = useSelector(state => state.auth)
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

    },[dispatch, alert, isAuthenticated, error])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    } 

  return (
      <Fragment>
          {loading ? <Loader /> : (
              <Fragment>
                  <MetaData title={'login'} />
                  <div className="row wrapper">
                        <div className="col-1 col-lg-6">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password_field">Password</label>
                                    <input
                                        type="password"
                                        id="password_field"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                              <div className="d-flex flex-row bd-highlight mb-3 mt-2">
                              <Link to="/password/forgot" >Forgot Password?</Link>
                              <Link to="/register" className="mx-1"> New User?</Link>
                              <button
                                    id="login_button"
                                    type="submit"
                                    className="btn mx-4 float-right px-4 mt-0"
                                >LOGIN
                              </button>
                                </div>
                            </form>
                        </div>
                    </div>
              </Fragment>
          )}
          
    </Fragment>
  )
}

export default Login