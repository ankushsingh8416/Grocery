const { default: axios } = require("axios");
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:1337/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");
const getSliders = () =>
  axiosClient.get("/sliders?populate=*").then((resp) => {
    return resp.data.data;
  });

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((resp) => {
    return resp.data.data;
  });

const getProducts = () =>
  axiosClient.get("/products?populate=*").then((resp) => {
    return resp.data.data;
  });

const getProductsByCategory = (category) =>
  axiosClient
    .get("products/?filters[categories][name][$in]=" + category + "&populate=*")
    .then((resp) => {
      return resp.data.data;
    });

// ===============================SIGN-UP AND LOGIN AUtHNICATION ======================================

const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username: username,
    email: email,
    password: password,
  });

const SignIn = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password: password,
  });

const addToCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getCartItems = (userid, jwt) =>
  axiosClient
    .get(
      "/user-carts?filters[userid][$eq]=" +
        userid +
        "&[populate][products][populate][images][populate][0]=url",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;
      const cartItemsList = data.map((item, index) => ({
        name: item.attributes.products?.data[0].attributes.Name,
        quantity: item.attributes.quantity,
        amount: item.attributes.amount,
        image:
          item.attributes.products?.data[0].attributes.images.data[0].attributes
            .url,
        actualPrice: item.attributes.products?.data[0].attributes.mrp,
        id: item.id,
      }));
      return cartItemsList;
    });


    const deleteCartItem=(id,jwt)=>axiosClient.delete("/user-carts/" + id,
    {
      headers: {
        Authorization: "Bearer " + jwt
      },
    })
export default {
  getCategory,
  getSliders,
  getCategoryList,
  getProducts,
  getProductsByCategory,
  registerUser,
  SignIn,
  addToCart,
  getCartItems,
  deleteCartItem
};
