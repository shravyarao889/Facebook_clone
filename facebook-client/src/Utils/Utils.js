// handle
export const HanldleErr = (err) =>{
    if(err.response.status === 401){
        return localStorage.removeItem('AccessToken');
    }
    console.log(err.response.data)
}