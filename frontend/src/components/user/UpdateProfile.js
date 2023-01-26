import React, { Fragment, useEffect, useState } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { useAlert } from "react-alert";
import { updateProfile,loadUser, clearErrors } from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("images/default_avatar.png");
  
    const dispatch = useDispatch();
    const navigate = useNavigate(); //instead of useHistory--useNAvigate is used
  
    const {user} = useSelector((state) => state.auth);
    const { error, isUpdated, loading } = useSelector(state => state.user);
  
    useEffect(() => {
      if (user) {
          setName(user.name);
          setEmail(user.email);
          setAvatarPreview(user.avatar.url);
      }
      if (error) {
        alert(error);
        dispatch(clearErrors());
        }
        if (isUpdated) { 
            alert('user updated successfully');
            dispatch(loadUser());

            navigate("/me")
            dispatch({
                type:UPDATE_PROFILE_RESET
            })
        }  
    }, [dispatch, alert, isUpdated, error,navigate]);
  
    const submitHandler = (e) => {
      e.preventDefault();
        // debugger;
      const formData = new FormData();
      formData.set("name", name);
      formData.set("email", email);
      formData.set("avatar", avatar);
  
      dispatch(updateProfile(formData));
    };
  
    const onChange = (e) => {
  
        const reader = new FileReader();
  
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(reader.result);
          }
        };
  
        reader.readAsDataURL(e.target.files[0]);
    };

  return (
    <Fragment>
      <MetaData title={"Update Profile"} />

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow-lg"
            onSubmit={submitHandler}
            encType="multipart/form-data"
          >
            <h1 className="mt-2 mb-5">Update Profile</h1>

            <div className="form-group">
              <label htmlFor="email_field">Name</label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group mt-3">
              <label htmlFor="avatar_upload mb-1">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    <img
                      src={avatarPreview}
                      className="rounded-circle"
                      alt="Avatar Preview"
                    />
                  </figure>
                </div>
                <div class="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    class="custom-file-input"
                    id="customFile"
                    accept="image/*"
                    onChange={onChange}
                    aria-describedby="inputGroupFileAddon01"
                  />
                  <label class="custom-file-label text-muted" for="inputGroupFile01">
                    Choose Avatar...
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn update-btn btn-block mt-4 mb-3"
              disabled={loading ? true : false}
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

export default UpdateProfile