import axios from "axios";

//login 
export const SignIn = (data) => axios.post('auth/login' , data );

//signup 
export const createAccount = (data) => axios.post('auth/signup' , data);