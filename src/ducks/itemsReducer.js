import Axios from "axios";


const initialState = {
    listItemsArr: [],
    userListedItemsArr: [],
    itemsCategorys: [],
    itemsCategoryPoints: "",
    message: "",
    loading: false
}

const GET_ITEMS_LIST = 'GET_ITEMS_LIST';
const GET_CATEGORYS = 'GET_CATEGORYS';
const GET_CATEGORY_POINTS = 'GET_CATEGORY_POINTS';
const CREATE_NEW_ITEM_POST = 'CREATE_NEW_ITEM_POST';
const GET_USER_ITEMS_LIST = 'GET_USER_ITEMS_LIST';
const DELETE_POSTED_ITEM = 'DELETE_POSTED_ITEM';


export function getItemsList() {
    let data = Axios.get('/getItems').then(res => res.data)
    return {
        type: GET_ITEMS_LIST,
        payload: data
    }
}

export function getCategorys() {
    let data = Axios.get('/getcategorys').then(res => res.data)
    return {
        type: GET_CATEGORYS,
        payload: data
    }
}

export function getCategoryPoints(category) {
    let data = Axios.put('/get-category-points', {category: category}).then(res => res.data)
    return {
        type: GET_CATEGORY_POINTS,
        payload: data
    }
}

export function createNewItem(itemInfo) {
    let data = Axios.post('/create-new-item-post', itemInfo).then(res => res.data)
    return {
        type: CREATE_NEW_ITEM_POST,
        payload: data
    }
}

export function getUsersItemsList(userID) {
    let data = Axios.get(`/get-user-posted-items/${userID}`).then(res => res.data)
    return {
        type: GET_USER_ITEMS_LIST,
        payload: data
    }
}

export function deleteItem(listItemId) {
    let data = Axios.delete(`/delete-posted-item/${listItemId}`).then(res => res.data)

    return {
        type: DELETE_POSTED_ITEM,
        payload: data
    }
}

export default function reducer(state = initialState, action ) {
    switch (action.type) {

    // Get items list
        case GET_ITEMS_LIST + '_PENDING':
            return {...state, loading: true}
        case GET_ITEMS_LIST + '_FULFILLED':
            return {...state, listItemsArr: action.payload, loading: false}
        case GET_ITEMS_LIST + '_REJECTED':
            console.log('rejected');
            return {...state, loading: false}  
        
    // Get categorys
        case GET_CATEGORYS + '_PENDING':
            return {...state, loading: true}
        case GET_CATEGORYS + '_FULFILLED':
            return {...state, itemsCategorys: action.payload, loading: false}
        case GET_CATEGORYS + '_REJECTED':
            console.log('rejected');
            return {...state, loading: false}  

    // Get category points
        case GET_CATEGORY_POINTS + '_PENDING':
            return {...state, loading: true}
        case GET_CATEGORY_POINTS + '_FULFILLED':
            return {...state, itemsCategoryPoints: action.payload, loading: false}
        case GET_CATEGORY_POINTS + '_REJECTED':
            console.log('rejected');
            return {...state, loading: false}
        
    // Create new item post
        case CREATE_NEW_ITEM_POST + '_PENDING':
            return {...state, loading: true}
        case CREATE_NEW_ITEM_POST + '_FULFILLED':
            return {...state, listItemsArr: action.payload, loading: false}
        case CREATE_NEW_ITEM_POST + '_REJECTED':
            console.log('rejected');
            return {...state, loading: false}
    
    // Get users posted items
        case GET_USER_ITEMS_LIST + '_PENDING':
            return {...state, loading: true}
        case GET_USER_ITEMS_LIST + '_FULFILLED':
            return {...state, userListedItemsArr: action.payload, loading: false}
        case GET_USER_ITEMS_LIST + '_REJECTED':
            console.log('rejected');
            return {...state, loading: false}
    
    // Delete posted items
        case DELETE_POSTED_ITEM + '_PENDING':
            return {...state, loading: true}
        case DELETE_POSTED_ITEM + '_FULFILLED':
            return {...state, message: action.payload, loading: false}
        case DELETE_POSTED_ITEM + '_REJECTED':
            console.log('rejected');
            return {...state, loading: false}
    


        default:
        return {...state, loading: false }
    }
}
