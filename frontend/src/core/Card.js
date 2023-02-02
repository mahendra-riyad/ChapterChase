import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import { API } from "../config";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  showProduct = false,
  setRun = (f) => f,
  run = undefined,
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
            View Product
          </button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
console.log('added');
return <Redirect to="/cart" />;
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2 card-btn-1  "
        >
          Add to cart
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  const card = () => {
    return (
      <div to={`/product/${product._id}`} className="a-box">
      <div>
        <div className="img-container">
          <div className="img-inner">
            <div className="inner-skew">
              <img src={`${API}/product/photo/${product._id}`} alt="" />
            </div>
          </div>
        </div>
        <div className="text-container">
          <h3>{product.name}</h3>
          <div className="description">
            <span>Added on {moment(product.createdAt).fromNow()}</span>
              <span>{showStock(product.quantity)}</span>
            </div>
            <div className="description">
            {showViewButton(showViewProductButton)}

            {showAddToCartBtn(showAddToCartButton)}
      
            {showRemoveButton(showRemoveProductButton)}
      
            {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
      </div>
    </div>
    );
  };
  // return (
  //   <div className="card ">
  //   <div className="card-header card-header-1 ">{product.name}</div>
  //   <div className="card-body">
  //     {shouldRedirect(redirect)}
  //     <ShowImage item={product} url="product" />
  //     <p className="card-p  mt-2">
  //       {product.description.substring(0, 100)}{" "}
  //     </p>
  //     <p className="card-p black-10">$ {product.price}</p>
  //     <p className="black-9">
  //       Category: {product.category && product.category.name}
  //     </p>
  //     <p className="black-8">
  //       Added on {moment(product.createdAt).fromNow()}
  //     </p>
  //     {showStock(product.quantity)}
  //     <br />

  //     {showViewButton(showViewProductButton)}

  //     {showAddToCartBtn(showAddToCartButton)}

  //     {showRemoveButton(showRemoveProductButton)}

  //     {showCartUpdateOptions(cartUpdate)}
  //   </div>
  // </div>
  // );

  // return (
    // <Link to={`/product/${product._id}`} className="a-box">
    //   <div>
    //     <div className="img-container">
    //       <div className="img-inner">
    //         <div className="inner-skew">
    //           <img src={`${API}/product/photo/${product._id}`} alt="" />
    //         </div>
    //       </div>
    //     </div>
    //     <div className="text-container">
    //       <h3>{product.name}</h3>
    //       <div className="description">
    //         <span>Added on {moment(product.createdAt).fromNow()}</span>
    //         <span>{showStock(product.quantity)}</span>
    //       </div>
    //     </div>
    //   </div>
    // </Link>
  // );

  const productDetails = () => {
    return (
      <div className="card-wrapper">
        <div className="card">
          <div className="product-imgs">
            <div className="img-display">
              <div className="img-showcase">
                <img src={`${API}/product/photo/${product._id}`} alt="" />
              </div>
            </div>
          </div>
          <div className="product-content">
            <h2 className="product-title">{product.name}</h2>
            <div className="product-price">
              <p className="new-price">
                Price: <span>${product.price}</span>
              </p>
            </div>

            <div className="product-detail">
              <h2>about this item: </h2>
              <p>{product.description}</p>
              <ul>
                <li>
                  Available: <span>{showStock(product.quantity)}</span>
                </li>
                <li>
                  Category:{" "}
                  <span>{product.category && product.category.name}</span>
                </li>
                <li>
                  Shipping: <span>All over the world</span>
                </li>
              </ul>
            </div>

            <div>
                {showViewButton(showViewProductButton)}
          
                {showAddToCartBtn(showAddToCartButton)}
          
                {showRemoveButton(showRemoveProductButton)}
          
                {showCartUpdateOptions(cartUpdate)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // <input type="number" min="0" value="1" />
  //             <button type="button" className="btn">
  //               Add to Cart
  //             </button>

  return (<div>
    {showProduct ? productDetails() : card()}
  </div>);
};

export default Card;
