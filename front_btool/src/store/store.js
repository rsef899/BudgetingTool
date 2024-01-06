import { configureStore} from "@reduxjs/toolkit"


const initialState = {
    user: 'Test user',
    netBalance: 0,
    isModal: false
}

//action controls what field we are actually changing
function handleState (state = initialState, action){
    switch(action.type){
        case 'SET_USER':
            return {
                ...state, 
                user: action.user
            }
        case 'SET_NET_BALANCE':
            return{
                ...state,
                netBalance: action.netBalance
            }
        default:
            return state
    }
}

//this is where you set the reducer
const store = configureStore({
    reducer: handleState
});

export default store