import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import { API } from "../config";
import "../css/product.css";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  // {product && product.description && (
  //   <Card product={product} showViewProductButton={false} />
  // )}
  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div>
        <div className="card-wrapper">
          <div className="card">
            <div className="product-imgs">
              <div className="img-display">
                <div className="img-showcase">
                  <img
                    src={`${API}/product/photo/${product._id}`} alt=""
                  />
                  
                </div>
              </div>
             
            </div>
            <div className="product-content">
              <h2 className="product-title">{product.name}</h2>
              <div className="product-price">
                <p className="new-price">
                  Price: <span>${ product.price}</span>
                </p>
              </div>

              <div className="product-detail">
                <h2>about this item: </h2>
                <p>
                  {product.description}
                </p>
                <ul>
                  <li>
                    Available: <span>in stock</span>
                  </li>
                  <li>
                    Category: <span>{ product.category && product.category.name}</span>
                  </li>
                  <li>
                    Shipping: <span>All over the world</span>
                  </li>
                </ul>
              </div>

              <div className="purchase-info">
                <input type="number" min="0" value="1" />
                <button type="button" className="btn">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <h4 className="mt-4 mb-4">Related products</h4>
        <div className="grid">
          {relatedProduct.map((p, i) => (
            <Card key={i} product={p} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
