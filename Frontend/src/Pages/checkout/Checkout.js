import { message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { CLEAR__CART } from "../../Redux/actions/Action";
import { Order } from "../../RequestApiCalls/OrdersApiCalls";
import { userRequest } from "../../RequestApiCalls/Request";

const SafePayButton = ({ TotalBill, cart, userId }) => {
console.log(TotalBill, cart, userId);

const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const makeRequest = async ()=>{
     try {
       const res =  await userRequest.post("/checkout/payment" , {
        userId, 
        cart
       });
 
       if (res.status === 200) {
        console.log(res.data);
         window.location.href = res.data.url;
       }
      //  swal("Thank You!", "Order placed successfully!", "success");
 
      //  const OrderPayment = parseInt(TotalBill);;
      //  const address = res.data.billing_details.address;
      //  Order(message, userId, cart, OrderPayment , address,dispatch,CLEAR__CART)
   } catch (error) {
     // swal("Sorry!", `${error.response.data}`, "error");
       console.log(error);
   }
    }
  
  
  return (
    <button
      onClick={makeRequest}
      type="button"
      class="btn btn-primary btn-lg btn-block"
    >
      Pay with Stripe
    </button>
  );
};






export default SafePayButton;


    
    
    
    
    
    
    






//   const makeRequest = async ()=>{
//    try {
//      const res =  await userRequest.post("/checkout/payment" , {
//        currency: 'PKR',
//        amount : TotalBill,
//      });
//      console.log(res.data);
//      swal("Thank You!", "Order placed successfully!", "success");

//      const OrderPayment = TotalBill;
//      const address = res.data.billing_details.address;
//      Order(message, User._id, cartData, OrderPayment , address,dispatch,CLEAR__CART)
//  } catch (error) {
//    // swal("Sorry!", `${error.response.data}`, "error");
//      console.log(error);
//  }
//   }
