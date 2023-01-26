import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"My Profile"} />
          <h2 className="mt-5 ml-5">My Profile</h2>
          <div className="row justify-content-around mt-5 user-info">
            <div className="col-12 col-md-3">
              <figure className="avatar avatar-profile mb-4">
                <img
                  className="rounded-circle img-fluid"
                  src={user.avatar.url}
                  alt={user.name}
                />
                </figure>
                <h3 className="mx-3">Hi🙋🏻‍♂️ {user.name}!</h3>
            </div>

            <div className="col-12 col-md-5">
              <h4>Full Name</h4>
              <p>{user.name}</p>

              <h4>Email Address</h4>
              <p>{user.email}</p>

              <h4>Joined On</h4>
              <p>{String(user.createdAt).substring(0, 10)}</p>

              {user.role === "admin" && (
                <Link to="/orders/me" className="btn btn-danger btn-md">
                  My Orders
                </Link>
              )}

              <Link
                to="/password/update"
                className="btn btn-primary btn-md"
              >
                Change Password
                </Link>
                <Link
                to="/me/update"
                id="edit_profile"
                className="btn btn-primary btn-md"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
