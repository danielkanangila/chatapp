import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup"
import { useWebSocket } from "./useWebSocket";
import { clearOnLogout } from "../store";
import { 
    register as createUser, 
    login as authenticateUser,
    logout as logoutUser, 
} from "./../store/utils/thunkCreators";

export const useAuth = () => {
    const [error, setError] = useState();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const ws = useWebSocket();

    const registerInitialValue = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const loginInitialValue = {
        username: "",
        password: "",
    }

    const registerValidationSchema = yup.object().shape({
        username: yup.string().required(),
        email:yup.string().email(),
        password: yup.string().min(8),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], "Passwords must match.")
    })

    const loginValidationSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required(),
    })

    const _handleResponse = (resetForm) => {
        if (user.id) return resetForm();
        else if (user.error) return setError(user.error)
    }

    const register = async (data, { resetForm }) => {
        await dispatch(createUser(data))

        // then reset from or handle error if any
        _handleResponse(resetForm)
    
    }

    const login = async (data, { resetForm }) => {
        await dispatch(authenticateUser(data))

        // then reset from or handle error if any
        _handleResponse(resetForm)
    }

    const logout = async () => {
        dispatch(logoutUser(user.id));
        dispatch(clearOnLogout());
        // emit logout event
        ws.logout(user.id);
    }

    return {
        user,
        registerInitialValue,
        loginInitialValue,
        error,
        registerValidationSchema,
        loginValidationSchema,
        register,
        login,
        logout,
    }
}