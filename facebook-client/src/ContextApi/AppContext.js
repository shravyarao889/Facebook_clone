import {createContext , useReducer , useEffect} from 'react'
import { ProfileInfo } from '../Apis/User'
import PostInit from '../InitStates/PostInit'
import UserInit from '../InitStates/UserInit'
import PostReducer from '../Reducers/Post'
import UserReducer from '../Reducers/User'
import { HanldleErr } from '../Utils/Utils'

export const AppContenxt = createContext()

const AppProvider = ({children}) => {
    const [PostGState , disptachPost] = useReducer(PostReducer ,PostInit);
    const [UserGState , dispatchUser] = useReducer(UserReducer , UserInit);

    //passed value 
    const values = {
        PostGState,
        disptachPost,
        UserGState,
        dispatchUser
    }
    // get userdata when page refreshed 
    useEffect(() => {
        (async () => {
            await ProfileInfo().then(res => {
                dispatchUser({type:"USER_INFO" , payload:res.data})
            }).catch(err => {
                HanldleErr(err)
            })
        })();
    },[])
    return(
        <AppContenxt.Provider value={values}  >
            {children}
        </AppContenxt.Provider>
    )
}

export default AppProvider;