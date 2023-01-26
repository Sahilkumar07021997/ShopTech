import React, { Fragment, useState, useEffect } from 'react'
import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser,getUserDetails, clearErrors } from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateUser = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { error, isUpdated } = useSelector(state => state.user);
  
    const { users } = useSelector(state => state.userDetails);
    const userId = params.id;

    useEffect(() => {
        if (!users || (users && users._id !== userId)) {
            dispatch(getUserDetails(userId))    
        } else {
            setName(users.name);
            setEmail(users.email);
            setRole(users.role)
        }

        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert('User updated successfully')

            navigate('/dashboard')

            dispatch({
                type: UPDATE_USER_RESET
            })
        }

    }, [dispatch, alert, error, isUpdated, userId, users])



    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('role', role);

        dispatch(updateUser(formData,users._id))
    }


    return (
        <Fragment>
            <MetaData title={`Update User`} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update User</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
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
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="" disabled selected className='text-muted'>select role...</option>
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdateUser