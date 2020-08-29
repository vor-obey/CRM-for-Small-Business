
export const DASHBOARD = '/dashboard'

export const ORDERS = '/orders'
export const ORDER_PAGE = `${ORDERS}/:id`
export const ORDERS_CREATE = `${ORDERS}/create`
export const ORDERS_EDIT = `${ORDERS}/:id/edit`

export const PRODUCTS = '/products'
export const PRODUCT_PAGE = `${PRODUCTS}/:id`
export const PRODUCTS_CREATE = `${PRODUCTS}/create`
export const PRODUCTS_EDIT = `${PRODUCTS}/:id/edit`

export const PRODUCT_TYPES = `${PRODUCTS}/types`
export const PRODUCT_TYPE_PAGE = `${PRODUCT_TYPES}/:id`
export const PRODUCT_TYPES_CREATE = `${PRODUCT_TYPES}/create`
export const PRODUCT_TYPES_EDIT = `${PRODUCT_TYPES}/:id/edit`


export const PRODUCT_TEMPLATES = `${PRODUCTS}/templates`
export const PRODUCT_TEMPLATES_PAGE = `${PRODUCT_TEMPLATES}/:id`
export const PRODUCT_TEMPLATES_CREATE = `${PRODUCT_TEMPLATES}/create`
export const PRODUCT_TEMPLATES_EDIT = `${PRODUCT_TEMPLATES}/:id/edit`

console.log(PRODUCT_TEMPLATES_PAGE, PRODUCT_TEMPLATES_CREATE)

export const CUSTOMERS = '/customers'
export const CUSTOMER_PAGE = `${CUSTOMERS}/:id`;
export const CUSTOMERS_CREATE = `${CUSTOMERS}/create`
export const CUSTOMERS_EDIT = `${CUSTOMERS}/:id/edit`

export const USERS = '/users'
export const USER_PAGE = `${USERS}/:id`
export const USERS_CREATE = `${USERS}/create`
export const USERS_EDIT = `${USERS}/:id/edit`

export const CHAT = '/chat'
export const CHAT_TEMPLATES = `${CHAT}/message-templates`
export const CHAT_TEMPLATES_CREATE = `${CHAT_TEMPLATES}/create`

export const NOTIFICATIONS = '/notifications'
