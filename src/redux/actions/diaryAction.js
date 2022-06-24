import axios from "axios";
import { API_URL } from "../../helper";

export const postDiaryAction = (data) => {
    return async (dispatch) => {
        try {
            let res = await axios.post(`${API_URL}/comment`, data)
            if(res.data.success){
                return {success: res.data.success}
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const editDiaryAction = (data, id) => {
    return async (dispatch) => {
        try {
            let res = await axios.patch(`${API_URL}/comment/${id}`, data)
            if(res.data.success){
                return {success: res.data.success}
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getDiaryAction = (iduser) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/comments?user=${iduser}`)
            if (res.data.success) {
                // console.log('isi comment', res.data.dataComments)
                return {success: res.data.success, dataComments: res.data.dataComments}
            }
        } catch (error) {
            console.log(error)
        }
    }
}