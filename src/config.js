const BASE_URL = 'https://react-project-7ee5d-default-rtdb.firebaseio.com';

const API = {
  signup:
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqJzZE8p6R8v6xseEIfv651525lLDsQrg',
  login:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqJzZE8p6R8v6xseEIfv651525lLDsQrg',
  productlist: `${BASE_URL}/productlist`,
  product: `${BASE_URL}/product`,
  carts: `${BASE_URL}/carts`,
};

export default API;
