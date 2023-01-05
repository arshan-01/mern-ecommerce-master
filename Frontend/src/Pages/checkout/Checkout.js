import { message } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { CLEAR__CART } from "../../Redux/actions/Action";
import { Order } from "../../RequestApiCalls/OrdersApiCalls";
import { userRequest } from "../../RequestApiCalls/Request";

const SafePayButton = ({ TotalBill, cart, UserId }) => {
    let paymentNotification;
  const bill = parseInt(TotalBill);
  console.log(bill, cart);
const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const makeRequest = async () => {
    try {
      const {
        data: { token },
      } = await userRequest.post("/checkout/payment", {
        amount: bill,
        currency: "PKR",
      });

      // Create a checkout link
      const { data: { url },} = await userRequest.post("/checkout/create-checkout-link", {
        token,
      });

      window.location.href = url;
    } catch (error) {
      console.error(error);
    }
  };
  
  const verifySignature = async (paymentNotification) => {
    try {
        // Send a request to the server to verify the payment notification
        const response = await userRequest.post('/checkout/verify-signature', paymentNotification);
        return response.status === 200;
    } catch (error) {
        console.error(error);
        return false;
    }
};

  useEffect(() => {
    let url = window.location.search
     paymentNotification = { 
        "orderId": "T800",
        "amount": 1000,
        "currency": "PKR",
        "status": "paid",
    }; // payment notification data  
    
    console.log(url)
    console.log(paymentNotification)
    verifySignature(paymentNotification).then((isValidSignature) => {
      if (isValidSignature) {
        console.log("Thank You! Order placed successfully!")
      } else {
       console.log("Invalid signature");
      }
    });
  });

//   useEffect(() => {
//     const webhookNotification = {
//       // webhook notification data
//     };

//     verifyWebhook(webhookNotification).then((isValidWebhook) => {
//       if (isValidWebhook) {
//         // mark the invoice as paid
//       } else {
//         // show an error
//       }
//     });
//   }, []);
  return (
    <button
      onClick={makeRequest}
      type="button"
      class="btn btn-primary btn-lg btn-block"
    >
      Pay with SafePay
    </button>
  );
};






export default SafePayButton;


// const verifyWebhook = async (webhookNotification) => {
//     try {
//         // Send a request to the server to verify the webhook notification
//         const response = await axios.post('/verify-webhook', webhookNotification);
//         return response.status === 200;
//     }
//     catch (error) {
//         console.error(error);
//         return false;
//     }
// };
    
    
    
    
    
    
    
    
    
    






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
