import { message, Image } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ADD, FETCH_PRODUCT, REMOVE } from "../../Redux/actions/Action";
import { publicRequest } from "../../RequestApiCalls/Request";

import "./ProductCard.css";

function ProductCard() {

  let cartData = useSelector((state) => state.CartReducer.cart);

  const [Allproducts,setAllproducts] = useState([])
  const [filters,setFilters] = useState({})


  const dispatch = useDispatch();
  function handlefilter(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value }
    )
  }

  const {category , sort} = filters;
  

  useEffect(() => {
      const unsub = async () => {
          try {
              const res = await publicRequest.get(category? `/products?category=${category}`: "/products");
              if (res.status === 200) {
                setAllproducts(res.data);
                dispatch(FETCH_PRODUCT(res.data));
              }
          } catch (error) {
            console.log(error);
          }
      };
      unsub();
  }, [category]);

useEffect(() => {
  if(sort==="newest"){
    setAllproducts ((prev)=>
      [...prev].sort((a,b)=>a.createdAt - b.createdAt)
    )
  }
  else if(sort==="asc"){
    setAllproducts ((prev)=>
      [...prev].sort((a,b)=>a.price - b.price)
    )
  }
  else{
    setAllproducts ((prev)=>
      [...prev].sort((a,b)=>b.price - a.price)
    )
  }
}, [category,sort])


  return (
    <div className="container">
      <div className="product__filters">
        <div className="product__category">
          <select name = "category" class="form-select" aria-label="Default select example" onChange={handlefilter}>
            <option value="" selected >All</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>
        <div className="product__price">
          <select name = "sort" class="form-select" aria-label="Default select example" onChange={handlefilter}>
            <option value="newest" selected>Newest</option>
            <option value="asc">Price (asc)</option>
            <option value="desc">Price (desc)</option>
          </select>
        </div>
      </div>
      <div className=" row">
        {Allproducts?.map((prod) => {
          return (
            <div class=" col-6 col-sm-6 col-md-4 col-lg-3 " key={prod?._id}>
              <div class="card mt-5 productCard-card">
                <div class="card-badge">Sale</div>
                <div class="product-tumb">
                <Image
                    // width={200}
                    src={prod?.image}
                  />
                </div>
                <div class="product-details">
                  {/* <span class="product-catagory">{prod.categories[0]}</span> */}
                  <h4>
                    <Link to={`/ProductDetail/${prod?._id}`}>{prod?.title}</Link>
                  </h4>
                  {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p> */}
                  <div class="product-bottom-details col-12">
                    <div class="product-price ">
                      {/* <small>$96.00</small> */}
                      PKR {prod?.price}
                    </div>
                    <div class="product-links">
                      <i class="fa fa-heart"></i>
                      {cartData.some((p) => p._id === prod?._id) ? (
                        <i
                          title="Remove from cart"
                          onClick={() => {
                            dispatch(REMOVE(prod?._id));
                            message.success("Product removed from cart");
                          }}
                          class="fa fa-shopping-cart"
                          style={{ color: "#fbb72c" }}
                        ></i>
                      ) : (
                        <i
                          title="Add to cart"
                          onClick={() => {
                            dispatch(ADD(prod && prod));
                            message.success("Product added to cart");
                          }}
                          class="fa fa-shopping-cart"
                        ></i>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductCard;
