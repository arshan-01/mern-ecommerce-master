
import { userRequest } from "./Request";



export const Order = async (message, userId , products ,dispatch,CLEAR__CART)=> {

    try {
      const res = await userRequest.post ("/orders" , {userId , products});
      if (res.status === 200) {
        message.success("Order Placed Successfully");
        console.log("Order Placed Successfully");
      }
         await dispatch (CLEAR__CART());
    } catch (error) {
      console.log("Something went wrong");
    }
  }



    // export const getAllOrders = async (UserId, message ,dispatch) => {
    //     try {
    //       const res = await userRequest.get (`/orders/all/${UserId}`);
    //       if (res.status === 200) {
    //         dispatch(USER__ORDERS(res.data));
    //       }
    //     } catch (error) {
    //       message.error(error.response.data);
    //     }
    //   }
  
  
 
