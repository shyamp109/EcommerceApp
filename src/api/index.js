import client, { METHODS } from './client';

export const api = {
    auth: {
        login: (params) =>
            client({
                url: '/api/customer/signin',
                data: params,
                method: METHODS.POST
            }),
        register: (params) =>
            client({
                url: '/api/customer/signup',
                data: params,
                method: METHODS.POST
            })
    },
    category: {
        get: () =>
            client({
                url: '/category',
                method: METHODS.GET
            })
    },
    product: {
        get: (data) =>
            client({
                url: '/product',
                method: METHODS.GET,
                ...data
            }),
        getProductById: (id) =>
            client({
                url: `/product/${id}`,
                method: METHODS.GET
            }),
        post: (params) =>
            client({
                url: '/product',
                data: params,
                method: METHODS.POST
            }),
        patch: ({ _id, ...params }) =>
            client({
                url: `/product/${_id}`,
                data: params,
                method: METHODS.PATCH
            }),
        delete: (params) =>
            client({
                url: `/product/${params}`,
                method: METHODS.DELETE
            })
    },
    review: {
        get: (id) =>
            client({
                url: `/product/review/${id}`,
                method: METHODS.GET
            }),
        post: (params) =>
            client({
                url: '/product/review',
                data: params,
                method: METHODS.POST
            })
    },
    category: {
        get: () =>
            client({
                url: '/category',
                method: METHODS.GET
            }),
        post: (params) =>
            client({
                url: '/category',
                data: params,
                method: METHODS.POST
            }),
        delete: (params) =>
            client({
                url: `/category/${params}`,
                method: METHODS.DELETE
            })
    },
    foodCategory: {
        get: () =>
            client({
                url: '/food/category',
                method: METHODS.GET
            }),
        post: (params) =>
            client({
                url: '/category',
                data: params,
                method: METHODS.POST
            }),
        delete: (params) =>
            client({
                url: `/category/${params}`,
                method: METHODS.DELETE
            })
    },
    foodItem: {
        get: (data) =>
            client({
                url: '/food/item',
                method: METHODS.GET,
                ...data
            })
    },
    cart: {
        add: (params) =>
            client({
                url: '/cart/addToCart',
                data: params,
                method: METHODS.POST
            }),
        remove: (params) =>
            client({
                url: `/cart/removeCart/${params?.product_id}`,
                method: METHODS.DELETE
            }),
        removeMulti: (data) =>
            client({
                url: `/cart/removemulti`,
                method: METHODS.POST,
                ...data
            }),
        get: (data) =>
            client({
                url: `/cart/myCart`,
                method: METHODS.GET,
                ...data
            })
    },
    restaurants: {
        get: () =>
            client({
                url: '/restaurants',
                method: METHODS.GET
            }),
        post: (params) =>
            client({
                url: '/restaurants',
                data: params,
                method: METHODS.POST
            }),
        patch: ({ _id, ...params }) =>
            client({
                url: `/restaurants/${_id}`,
                data: params,
                method: METHODS.PATCH
            }),
        delete: (params) =>
            client({
                url: `/restaurants/${params}`,
                method: METHODS.DELETE
            })
    },
    foodItem: {
        get: (id) =>
            client({
                url: `food/item/${id}`,
                method: METHODS.GET
            }),
        getAll: (data) =>
            client({
                url: `food/item`,
                method: METHODS.GET,
                ...data
            }),
        post: (params) =>
            client({
                url: '/food/item',
                data: params,
                method: METHODS.POST
            })
    },
    foodCategory: {
        get: () =>
            client({
                url: '/food/category',
                method: METHODS.GET
            }),
        post: (params) =>
            client({
                url: '/food/category',
                data: params,
                method: METHODS.POST
            }),
        delete: (params) =>
            client({
                url: `/food/category/${params}`,
                method: METHODS.DELETE
            })
    },
    order: {
        get: () =>
            client({
                url: `/order/getMyOrder`,
                method: METHODS.GET
            }),
        changeStatus: ({ _id, ...params }) =>
            client({
                url: `/order/updateStatus/${_id}`,
                data: params,
                method: METHODS.POST
            })
    },
    checkout: {
        create: (params) =>
            client({
                url: '/order/checkout',
                data: params,
                method: METHODS.POST
            })
    },
    confirmation: {
        verified: (params) =>
            client({
                url: '/order/addMyOrder',
                data: params,
                method: METHODS.POST
            })
    }
};
