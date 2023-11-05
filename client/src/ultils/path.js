/** @format */

const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*',
    LOGIN: 'login',
    PRODUCTS__CATEGORY: ':category',
    PRODUCTS: 'products', // do path products không có Comp nào để nhảy vào, nên path này chạy vào route category luôn
    BLOGS: 'blogs',
    OUT_SERVICES: 'out_services',
    FAQS: 'faqs',
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    FINALREGISTER: 'finalregister/:status',
    RESET_PASSWORD: 'reset-password/:token',
    CART_DETAIL: 'cart-detail',

    CHECKOUT: 'check-out',

    // admin
    ADMIN: 'admin',
    DASHBOARD: 'dashboard',
    CREATE_PRODUCTS: 'create_products',
    MANAGE_USER: 'manage_user',
    MANAGE_ORDER: 'manage_order',
    MANAGE_PRODUCT: 'manage_product',

    //member
    MEMBER: 'member',
    PERSONAL: 'personal',
    MY_CART: 'my_cart',
    WHISHLIST: 'wishlist',
    BUY_HISTORY: 'buy_history',
};

export default path;
