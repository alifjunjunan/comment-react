const INITIAL_STATE = {
    _id: null,
    fullname: '',
    email: '',
    password: '',
    role: '',
    status: '',
}

export const userReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
               _id: action.payload._id,
               fullname: action.payload.fullname,
               email: action.payload.email,
               password: action.payload.password,
               role: action.payload.role,
               status: action.payload.status
            }
        case 'LOGOUT' :
            return INITIAL_STATE
    
        default:
            return state;
    }
}