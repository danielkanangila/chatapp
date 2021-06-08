import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register as createUser } from "./../store/utils/thunkCreators"
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
        password: yup.string().length(8),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password'), null], "Passwords must be match.")
    })

    const register = async (data, { resetForm }) => {
        await dispatch(createUser(data))

        if (user.id) return resetForm();
        else if (user.error) return setError(user.error)
    
    }

    const login = () => {}

    return {
        user,
        registerInitialValue,
        loginInitialValue,
        error,
        registerValidationSchema,
        register,
        login,
    }
}