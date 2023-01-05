import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import ShopLogo from '../../assets/ShopLogo.png'
import { FacebookFilled ,TwitterSquareFilled,InstagramFilled  } from '@ant-design/icons';
const Footer = () => {
    let year = new Date().getFullYear()
  return (
    <div>
    
      <footer class="footer ">
        <div class="container footer-container pt-5">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-7">
              <div class="footer__about">
                <div class="footer__logo">
                  <Link to="/">
                    <img src={ShopLogo}  height="50" width="120" alt=" ShopLogo" loading="lazy" />
                  </Link>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt cilisis.
                </p>
                <div class="footer__payment">
                  <Link to="#">
                  <img class="me-2" width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
                  alt="Visa" />
                  </Link>
                  <Link to="#">
                  <img class="me-2" width="45px"
                  src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                  alt="Mastercard" />
                  </Link>
                  
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-5">
              <div class="footer__widget">
                <h6>Quick links</h6>
                <ul>
                  <li>
                    <Link to="#">About</Link>
                  </li>
                  <li>
                    <Link to="#">Blogs</Link>
                  </li>
                  <li>
                    <Link to="#">Contact</Link>
                  </li>
                  <li>
                    <Link to="#">FAQ</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-4">
              <div class="footer__widget">
                <h6>Account</h6>
                <ul>
                  <li>
                    <Link to="#">My Account</Link>
                  </li>
                  <li>
                    <Link to="#">Orders Tracking</Link>
                  </li>
                  <li>
                    <Link to="#">Checkout</Link>
                  </li>
                  <li>
                    <Link to="#">Wishlist</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-4 col-md-8 col-sm-8">
              <div class="footer__newslatter">
                <h6>NEWSLETTER</h6>
                <form action="#">
                  <input type="text" placeholder="Email" />
                  <button type="submit" class="btn btn-dark btn-rounded">
                    Subscribe
                  </button>
                </form>
                <div class="footer__social">
                  <Link to="#">
                  <FacebookFilled />
                  </Link>
                  <Link to="#">
                  <TwitterSquareFilled />
                  </Link>
                  <Link to="#">
                  <InstagramFilled />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 ">
              <div class="footer__copyright__text">
                <p>
                  Copyright &copy; {" "}
                  {year} {" "}
                   All
                  rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
