import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory, useNavigate,useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { forgotPassword,clearErrors } from "../../actions/userActions";
import { resetPassword } from "../../actions/userActions";

const NewPassword = () => {
        
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate(); //instead of useHistory--useNAvigate is used
    const params = useParams();
    const { error, success} = useSelector(state => state.forgotPassword);
  
    useEffect(() => {
        // debugger;
      if (error) {
        alert(error);
        dispatch(clearErrors());
        }
        if (success) { 
            alert("password updated successfully");
            navigate('/login')
        }  
    }, [dispatch, alert, error,success]);
  
    const submitHandler = (e) => {
      e.preventDefault();
      const formData = new FormData();
        formData.set("password", password);
        formData.set("confirmPassword", confirmPassword);
        
      dispatch(resetPassword(params.token,formData));
    };

  return (
    <Fragment>

    <MetaData title={'New Password Reset'} />

    <div className="row wrapper">
        <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">New Password</h1>

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

                <div className="form-group">
                    <label htmlFor="confirm_password_field">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm_password_field"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button
                    id="new_password_button"
                    type="submit"
                    className="btn btn-block py-3">
                    Set Password
                </button>

            </form>
        </div>
    </div>

</Fragment>
  )
}

export default NewPassword