import axios from "axios";
import { API_URL } from "../../helper";

export const loginAction = (email, password) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(`${API_URL}/user/login`, { email, password })
            if (res.data.success) {
                // console.log('isi login', res.data.dataUser[0])
                localStorage.setItem('data', JSON.stringify(res.data.dataUser[0]))
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: res.data.dataUser[0]
                })
                return { success: res.data.success }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const keepLoginAction = () => {
    return async (dispatch) => {
        try {
            let localdata = localStorage.getItem('data')
            if (localdata) {
                localdata = JSON.parse(localdata)
                let res = await axios.get(`${API_URL}/user/keep?email=${localdata.email}&password=${localdata.password}`)
                // console.log('isi keep login', res.data.dataUser)
                if (res.data.success) {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: res.data.dataUser
                    })

                    return { success: res.data.success }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const registerAction = (data) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(`${API_URL}/user/regist`, data)
            if(res.data.success){
                return {success: res.data.success}
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const logoutAction = () => {
    return async (dispatch) => {
        try {
            localStorage.removeItem('data')
            dispatch({
                type: 'LOGOUT'
            })
        } catch (error) {
            console.log(error)
        }
    }
}