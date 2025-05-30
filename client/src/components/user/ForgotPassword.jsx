import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, clearAuthError } from "../../actions/userActions";

export default function ForgotPassword() {
    const [inputs, setInputs] = useState({
        email: ""
    })
    const dispatch = useDispatch();
    const { error, message, loading } = useSelector(state => state.authState);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    function handleReset() {
        setInputs({
            email: ""
        })
        toast.info("Reset Successfully");

    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('email', inputs.email);
        dispatch(forgotPassword(formData))

    }


    useEffect(() => {
        if (message) {
            toast(message, {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER
            })
            setInputs({
                email: ""
            })
            return;
        }

        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => { dispatch(clearAuthError) }
            })
            return
        }
    }, [message, error, dispatch])


    return (
        <>
            <div className="row min-vw-100 min-vh-100 justify-content-center align-items-center mm-bgpic">
                <div className="col-11 col-sm-8 col-md-7 col-lg-6 col-xl-5">

                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 rounded-5 bg-body-tertiary bg-opacity-50">
                        <div className='text-center h2'>Reset Password</div>
                        <form className="w-100" onSubmit={handleSubmit}>

                            <div className="w-100 mt-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email" value={inputs.email} onChange={handleChange} placeholder="Enter email" required />
                            </div>


                            <div className="mt-3 text-center">
                                {loading ?
                                    (<div className="text-center">
                                        <div className="spinner-border text-primary " role="status">
                                        </div>
                                    </div>) : null
                                }

                                <button className="btn btn-primary me-5" type="submit">Submit</button>
                                <button className="btn btn-danger" type="reset" onClick={handleReset}>Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}