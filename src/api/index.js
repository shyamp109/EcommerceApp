import client, { METHODS } from "./client";
export const api = {
  auth: {
    login: (params) =>
      client({
        url: "/api/user/signin",
        data: params,
        method: METHODS.POST,
      }),
    register: (params) =>
      client({
        url: "/api/user/signup",
        data: params,
        method: METHODS.POST,
      }),
  },
  category: {
    get: (data) =>
      client({
        url: `/api/product/getbycategory/${data}`,
        method: METHODS.GET,
      }),
  },

  product: {
    get: (data) =>
      client({
        url: "/api/product/getallProduct",
        method: METHODS.GET,
        ...data,
      }),
    getProductById: (id) =>
      client({
        url: `/api/product/getproductbyid/${id}`,
        method: METHODS.GET,
      }),
    post: (params) =>
      client({
        url: "/product",
        data: params,
        method: METHODS.POST,
      }),
    patch: ({ _id, ...params }) =>
      client({
        url: `/product/${_id}`,
        data: params,
        method: METHODS.PATCH,
      }),
    delete: (params) =>
      client({
        url: `/product/${params}`,
        method: METHODS.DELETE,
      }),
    search: (params) =>
      client({
        url: `/api/product/searchproduct?q=${params}`,
        method: METHODS.GET,
      }),
  },
  review: {
    get: (id) =>
      client({
        url: `/product/review/${id}`,
        method: METHODS.GET,
      }),
    post: (params) =>
      client({
        url: "/product/review",
        data: params,
        method: METHODS.POST,
      }),
  },
  // category: {
  //   get: () =>
  //     client({
  //       url: "/category",
  //       method: METHODS.GET,
  //     }),
  //   post: (params) =>
  //     client({
  //       url: "/category",
  //       data: params,
  //       method: METHODS.POST,
  //     }),
  //   delete: (params) =>
  //     client({
  //       url: `/category/${params}`,
  //       method: METHODS.DELETE,
  //     }),
  // },
  foodCategory: {
    get: () =>
      client({
        url: "/food/category",
        method: METHODS.GET,
      }),
    post: (params) =>
      client({
        url: "/category",
        data: params,
        method: METHODS.POST,
      }),
    delete: (params) =>
      client({
        url: `/category/${params}`,
        method: METHODS.DELETE,
      }),
  },
  foodItem: {
    get: (data) =>
      client({
        url: "/food/item",
        method: METHODS.GET,
        ...data,
      }),
  },
  cart: {
    add: (id) =>
      client({
        url: "/api/product/addtocart",
        data: id,
        method: METHODS.POST,
      }),
    update: (data) =>
      client({
        url: `/api/product/updatecart/${data.id}`,
        data: { qty: data.qty },
        method: METHODS.PUT,
      }),
    remove: (params) =>
      client({
        url: `/api/product/removefromcart/${params.product_id}`,
        method: METHODS.DELETE,
      }),
    removeMulti: (data) =>
      client({
        url: `/cart/removemulti`,
        method: METHODS.POST,
        ...data,
      }),
    get: (data) =>
      client({
        url: "/api/product/getusercart",
        method: METHODS.GET,
        ...data,
      }),
  },
  restaurants: {
    get: () =>
      client({
        url: "/restaurants",
        method: METHODS.GET,
      }),
    post: (params) =>
      client({
        url: "/restaurants",
        data: params,
        method: METHODS.POST,
      }),
    patch: ({ _id, ...params }) =>
      client({
        url: `/restaurants/${_id}`,
        data: params,
        method: METHODS.PATCH,
      }),
    delete: (params) =>
      client({
        url: `/restaurants/${params}`,
        method: METHODS.DELETE,
      }),
  },
  foodItem: {
    get: (id) =>
      client({
        url: `food/item/${id}`,
        method: METHODS.GET,
      }),
    getAll: (data) =>
      client({
        url: `food/item`,
        method: METHODS.GET,
        ...data,
      }),
    post: (params) =>
      client({
        url: "/food/item",
        data: params,
        method: METHODS.POST,
      }),
  },
  foodCategory: {
    get: () =>
      client({
        url: "/food/category",
        method: METHODS.GET,
      }),
    post: (params) =>
      client({
        url: "/food/category",
        data: params,
        method: METHODS.POST,
      }),
    delete: (params) =>
      client({
        url: `/food/category/${params}`,
        method: METHODS.DELETE,
      }),
  },
  order: {
    add: () =>
      client({
        url: "/api/product/createorder",
        method: METHODS.POST,
      }),
    get: () =>
      client({
        url: "/api/product/getusersorder",
        method: METHODS.GET,
      }),
    changeStatus: ({ _id, ...params }) =>
      client({
        url: `/order/updateStatus/${_id}`,
        data: params,
        method: METHODS.POST,
      }),
  },
  checkout: {
    create: (params) =>
      client({
        url: "/order/checkout",
        data: params,
        method: METHODS.POST,
      }),
  },
  confirmation: {
    verified: (params) =>
      client({
        url: "/order/addMyOrder",
        data: params,
        method: METHODS.POST,
      }),
  },
};
