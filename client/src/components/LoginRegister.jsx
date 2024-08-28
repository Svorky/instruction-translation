import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LoginRegister = (props) => {
    const { title } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const loginregister = async () => {
        if (title === "Login") {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/user/login`,
                    { email, password },
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    setMessage(response.data.message);
                    console.log(response.data);
                    navigate("/");
                }
            } catch (error) {
                console.error(error);
                setMessage(error.response.data.message);
            }
        } else {
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/user/register`,
                    { email, password },
                    { withCredentials: true }
                );
                if (response.status === 201) {
                    setMessage(response.data.message);
                    console.log(response.data);
                    navigate("/login");
                } else if (response.status === 200) {
                    setMessage(response.data.message);
                    console.log(response.data);
                }
            } catch (error) {
                console.error(error);
                setMessage(error.response.data.message);
            }
        }
    };

    return (
        <>
            <h2>{title}</h2>
            <Box component={"form"} sx={{ m: 1 }} noValidate autoComplete='off'>
                <TextField
                    sx={{
                        m: 1,
                        label: { color: "white" },
                        input: { color: "white" },
                        fieldSet: { borderColor: "#1976d2" },
                    }}
                    id='email'
                    type='email'
                    label='Enter email'
                    variant='outlined'
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    sx={{
                        m: 1,
                        label: { color: "white" },
                        input: { color: "white" },
                        fieldSet: { borderColor: "#1976d2" },
                    }}
                    id='password'
                    type='password'
                    label='Enter password'
                    variant='outlined'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Box>
            <Button variant='contained' onClick={loginregister}>
                {title}
            </Button>
            <div>{message}</div>
        </>
    );
};

export default LoginRegister;

LoginRegister.propTypes = {
    title: PropTypes.string.isRequired,
};
