import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { GetCurrentUser, LoginUser } from '../../api/users';
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from '../../redux/loadersSlice';
import { SetToken, SetUser } from '../../redux/usersSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [formIsValid, setFormIsValid] = useState(false)

    const [nameIsValid, setNameIsValid] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [passwordIsValid, setPasswordIsValid] = useState(false)


    const [nameIsTouched, setNameIsTouched] = useState(false)
    const [emailIsTouched, setEmailIsTouched] = useState(false)
    const [passwordIsTouched, setPasswordIsTouched] = useState(false)


    let formIsValid = nameIsValid && emailIsValid && passwordIsValid


    useEffect(() => {

        if (name && nameIsTouched) {
            setNameIsValid(true)
        } else {
            setNameIsValid(false)
        }

        if (email && emailIsTouched) {
            setEmailIsValid(true)
        } else {
            setEmailIsValid(false)
        }

        if (password && passwordIsTouched) {
            setPasswordIsValid(true)
        } else {
            setPasswordIsValid(false)
        }
    }, [name, email, password, nameIsTouched, emailIsTouched, passwordIsTouched])

    const handleNameChange = (e) => {
        setName(e.target.value)
        if (!nameIsTouched) {
            setNameIsTouched(true)
        }
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        if (!emailIsTouched) {
            setEmailIsTouched(true)
        }

    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        if (!passwordIsTouched) {
            setPasswordIsTouched(true)
        }
    }


    const handleFormSubmit = async () => {
        if (!formIsValid) return
        try {
            dispatch(ShowLoading());
            // const res = await LoginUser({ name, email, password })
            await dispatch(LoginUser({ name, email, password })).unwrap()
            // dispatch(SetToken(res.data))
            dispatch(HideLoading());
            // console.log(res)

            // if (res.success) {
            //     localStorage.setItem("token", res.data)
            //     toast(res.message)
            // }

            navigate("/")

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    return (
        <div className="full flex justify-center register-bg">
            <Card className="m-6 height-auto card-width" elevation={5} >
                <CardContent>
                    <Typography variant="h4" component="h4">
                        Login
                    </Typography>
                    <hr />
                    <form className="register-form" >
                        <div>
                            <Typography htmlFor="name" variant="h6" component="label" >
                                <span style={{ color: "red" }}>* </span>
                                Name
                            </Typography>
                            <TextField autoComplete="off" id="name" size="small" fullWidth value={name} required onChange={handleNameChange} error={!nameIsValid && nameIsTouched} onBlur={() => setNameIsTouched(true)} />

                        </div>
                        <div>
                            <Typography htmlFor="email" variant="h6" component="label" >
                                <span style={{ color: "red" }}>* </span>
                                Email
                            </Typography>
                            <TextField autoComplete="off" id="email" size="small" fullWidth value={email} type="email" onChange={handleEmailChange} required error={!emailIsValid && emailIsTouched} onBlur={() => setEmailIsTouched(true)} />

                        </div>
                        <div>
                            <Typography htmlFor="password" variant="h6" component="label" >
                                <span style={{ color: "red" }}>* </span>
                                Password
                            </Typography>
                            <TextField autoComplete="off" id="password" size="small" fullWidth value={password} type="password" required onChange={handlePasswordChange} error={!passwordIsValid && passwordIsTouched} onBlur={() => setPasswordIsTouched(true)} />
                        </div>
                        <CardActions sx={{ marginTop: "20px", padding: 0 }}>
                            <Button variant="contained" sx={{ margin: 0 }} size="large" fullWidth disabled={!formIsValid} onClick={handleFormSubmit}>
                                <Typography variant="h6" component="p" >
                                    Login
                                </Typography>
                            </Button>
                        </CardActions>
                    </form>
                    <br />
                    <Typography variant="h6" component="a" color="primary">
                        Don't have an Account? <Link to="/register">Register</Link>
                    </Typography>
                </CardContent>

            </Card>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
            />

        </div >
    )
}
export default Login