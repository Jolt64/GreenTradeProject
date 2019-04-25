import Axios from 'axios';

const initialState = {
    userData: {
        user_firstName: "",
        user_lastName: "",
        user_userName: "",
        user_email: "",
        user_zip: "",
        user_img: ""
    },
    loading: false
}

const GET_USER_DATA = 'GET_USER_DATA';
const CREATE_USER = 'CREATE_USER';
const LOGOUT = 'LOGOUT';
const USER_LOGIN = 'USER_LOGIN';
const UPDATE_USER = 'UPDATE_USER'


export function createUser(newUser) {
    let data = Axios.post('/auth/register', newUser).then(res => res.data)
    return {
        type: CREATE_USER,
        payload: data
    }
    
}

export function getUserData() {
    let data = Axios.get('/auth/user').then(res => res.data)
    return {
        type: GET_USER_DATA,
        payload: data
    }
    
}

export function userLogout() {
    let data = Axios.delete('/logout').then(res => res.data)
    return {
        type: LOGOUT,
        payload: data
    }
    
}

export function userLogin(userInfo) {
    let data = Axios.put('/auth/login', userInfo).then(res => res.data)
    return {
        type: USER_LOGIN,
        payload: data
    }
}

export function updateUser(UpdatedUserInfo) {    
    let data = Axios.put('/auth/update', UpdatedUserInfo).then(res => res.data)
    return {
        type: UPDATE_USER,
        payload: data
    }
    
}

export default  function reducer(state = initialState, action) {
    // console.log("action",action);
    switch (action.type) {

// Register User
        case CREATE_USER + '_PENDING':
            return {...state, loading: true }
        case CREATE_USER + '_FULFILLED':
            return {...state,userData: {...action.payload}, loading: false }
        case CREATE_USER + '_REJECTED':
            console.log('rejected')    
            return {...state, loading: false }

// Retrieve User Data
        case GET_USER_DATA + '_PENDING':
            return {...state, loading: true }
        case GET_USER_DATA + '_FULFILLED':
            return {...state,userData: {...action.payload}, loading: false, loggedIn: true }
        case GET_USER_DATA + '_REJECTED':
            console.log('rejected')    
            return {...state, loading: false }

// Logout
        case LOGOUT + '_PENDING':
            return {...state, loading: true }
        case LOGOUT + '_FULFILLED':
            return {...state,userData: {...action.payload}, loading: false, loggedIn: false }
        case LOGOUT + '_REJECTED':
            console.log('rejected')
            return {...state, loading: false }

// Login
        case USER_LOGIN + '_PENDING':
            return {...state, loading: true }
        case USER_LOGIN + '_FULFILLED':
            return {...state,userData: {...action.payload}, loading: false, loggedIn: true }
        case USER_LOGIN + '_REJECTED':
            console.log('rejected')
            return {...state, loading: false }

// Update User Info
        case UPDATE_USER + '_PENDING':
            return {...state, loading: true }
        case UPDATE_USER + '_FULFILLED':
            return {...state,userData: {...action.payload}, loading: false, loggedIn: true }
        case UPDATE_USER + '_REJECTED':
            console.log('rejected')
            return {...state, message: action.payload.response.data.message , loading: false }
                
        default:
            return state
    }
}