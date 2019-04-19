import Axios from "axios";


const initialState = {
    listItemsArr: [],
    loading: false
}

const GET_ITEMS_LIST = 'GET_ITEMS_LIST';
const GET_CATEGORYS = 'GET_CATEGORYS';
const GET_CATEGORY_POINTS = 'GET_CATEGORY_POINTS';
const CREATE_NEW_ITEM_POST = 'CREATE_NEW_ITEM_POST';


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
    

        default:
        return {...state, loading: false }
    }
}
