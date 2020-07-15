// api
import fetch from '../utils/fetch';

// alter default attack pool
export const defaultPool = pool => fetch('/defaultPool', pool,'POST');

// alter default box based on default pool
export const defaultBox = box => fetch('/defaultBox', box);

// get current attack pool and box
export const getPoolAndBox = () => fetch('/poolAndBox');

// get user info
export const userInfo = qqId => fetch('/userInfo', qqId);

// get box info
export const boxInfo = () => fetch('/boxInfo');

// get attack info
export const attackInfo = () => fetch('/attackInfo');

// get attack pool
export const attackPool = () => fetch('/attackPool');
