import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Auth
export const login = credentials => API.post('/auth/login', credentials);
export const register = userInfo => API.post('/auth/register', userInfo);

// Users
export const fetchProfile = token =>
  API.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });

// Items

export const fetchItems = async (search = '') => {
   // Ensure search is always a string
   const term = typeof search === 'string' ? search.trim() : String(search).trim();

   try {
     const res = await API.get('/items', {
       // only send `search` param if we have non-empty term
       params: term ? { search: term } : {},
     });
     return res;
   } catch (err) {
     console.error('🚨 fetchItems failed:', err.response?.data || err.message);
     // fallback so your UI still sees res.data as an array
     return { data: [] };
   }
 };
export const fetchItem = id => API.get(`/items/${id}`);

export const createItem = async (data, token) => {
  console.log('createItem called with data:', data, 'token:', token);
  const sessionResponse = await fetch('/api/auth/session');
  const sessionData = await sessionResponse.json();
  console.log('Session data from /api/auth/session:', sessionData);
  if (!sessionData?.user) {
    throw new Error('Not authenticated');
  }
  let config = {};
  if (token && token !== 'oauth-user' && typeof token === 'string' && token.length > 20) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  if (data instanceof FormData) {
    data.append('userEmail', sessionData.user.email);
    data.append('userName', sessionData.user.name);
    console.log('Sending FormData with user info');
    return API.post('/items', data, config);
  } else {
    const dataWithUser = {
      ...data,
      userEmail: sessionData.user.email,
      userName: sessionData.user.name
    };
    console.log('Sending plain object with user info:', dataWithUser);
    return API.post('/items', dataWithUser, config);
  }
};

export const updateItem = (id, data, token) =>
  API.patch(`/items/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteItem = (id, token) =>
  API.delete(`/items/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Products
export const fetchProducts = async (category) =>
  axios.get(`/api/products?category=${encodeURIComponent(category)}`);