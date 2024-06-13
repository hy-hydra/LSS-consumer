// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_USERS = '/users';
const ROOTS_AUTH = '/auth';
const ROOTS_HOME = '/home';
const ROOTS_PROFILE = '/profile';
const ROOTS_ORDER = '/orders';
const ROOTS_SETTINGS = '/settings';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_USERS, '/signin'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  root: '/',
  home: {
    root: ROOTS_HOME,
  },
  productDetails: (name) => `/product/${name}`,
  search: '/search',
  myBag: '/myBag',
  notifications: '/notifications',
  orders: {
    root: ROOTS_ORDER,
    all: path(ROOTS_ORDER, '/all'),
    pending: path(ROOTS_ORDER, '/pending'),
    confirmed: path(ROOTS_ORDER, '/confirmed'),
    onway: path(ROOTS_ORDER, '/onway'),
    delivered: path(ROOTS_ORDER, '/delivered'),
    cancelled: path(ROOTS_ORDER, '/cancelled'),
  },
  settings: {
    root: ROOTS_SETTINGS,
    profile: path(ROOTS_SETTINGS, '/profile'),
    billing: path(ROOTS_SETTINGS, '/billing'),
    liked: path(ROOTS_SETTINGS, '/liked'),
    following: path(ROOTS_SETTINGS, '/following'),
    followers: path(ROOTS_SETTINGS, '/followers'),
    blocked: path(ROOTS_SETTINGS, '/blocked'),
    sponsorship: path(ROOTS_SETTINGS, '/sponsorship'),
  },
  logOut: '/logOut',
  users: {
    root: '/users',
    loginSteps: (stepName) => `/users/${stepName}`,
  },
  profile: {
    root: ROOTS_PROFILE,
    otherProfile: (id) => `/profile/${id}`,
  },
  user: {
    root: path(ROOTS_HOME, '/user'),
    new: path(ROOTS_HOME, '/user/new'),
    list: path(ROOTS_HOME, '/user/list'),
    cards: path(ROOTS_HOME, '/user/cards'),
    profile: path(ROOTS_HOME, '/user/profile'),
    account: path(ROOTS_HOME, '/user/account'),
    edit: (name) => path(ROOTS_HOME, `/user/${name}/edit`),
    demoEdit: path(ROOTS_HOME, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_HOME, '/e-commerce'),
    shop: path(ROOTS_HOME, '/e-commerce/shop'),
    list: path(ROOTS_HOME, '/e-commerce/list'),
    checkout: path(ROOTS_HOME, '/e-commerce/checkout'),
    new: path(ROOTS_HOME, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_HOME, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_HOME, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_HOME, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_HOME, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
};
