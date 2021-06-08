import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register as createUser, login as authenticateUser } from "./../store/utils/thunkCreators"
import * as yup from "yup"

export const useAuth = () => {
    const [error, setError] = useState();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

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

        _handleResponse(resetForm)
    
    }

    const login = async (data, { resetForm }) => {
        await dispatch(authenticateUser(data))
        console.log(user);
        _handleResponse(resetForm)
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
    }
}