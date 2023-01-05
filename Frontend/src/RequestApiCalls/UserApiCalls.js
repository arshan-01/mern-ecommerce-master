import { publicRequest } from './Request'
import { FETCHING, LOGIN__FAIL, LOGIN__SUCCESS, USER__REGISTERED } from '../Redux/actions/Action';



// Login Api calls
export const LoginApiCalls = async (dispatch, navigate, message, { email , password})=> {
  dispatch(FETCHING())
  try {
    const res = await publicRequest.post ("/auth/login" , {email , password});
    dispatch(LOGIN__SUCCESS(res.data))
     message.success("You are successfully logged in"); 
      navigate('/')
  } catch (error) {
    message.error(error.response.data);
    dispatch(LOGIN__FAIL())
  }
}

//Registration Api Call
export const RegisterApiCalls = async (dispatch, navigate, message, {username , email , password})=> {
  dispatch(FETCHING())
  try {
    const res = await publicRequest.post ("/auth/register" , {username , email , password});
    dispatch(USER__REGISTERED())  
     message.success("Registered Successful, You will be redirected to login page "); 
    navigate('/Login')
    } catch (error) {
      message.error(error.response.data);
      console.log(error)
    dispatch(LOGIN__FAIL())
  }
}



//Registration Api Call
export const LogoutApiCalls = async (navigate ,message)=> {
  try {
    const res = await publicRequest.get ("/auth/logout");
     message.success("Logout Successful"); 
      navigate('/Login')
    } catch (error) {
      message.error(error.response.data);
  }
}
