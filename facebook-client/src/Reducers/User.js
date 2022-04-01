const UserReducer = (state , action ) => {
    switch (action.type) {
        case "LOGIN":
        case "USER_INFO":
            return{
                isAuth:true,
                info:action.payload
            }
        case "LOGOUT":
            localStorage.removeItem('AccessToken');
            return{
                isAuth:false,
                info:{}
            }
        default:
            return state;
    }
}

export default UserReducer;