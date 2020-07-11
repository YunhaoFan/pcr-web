// api
import fetch from '../utils/fetch';

// get user info
export const userInfo = qqId => fetch('/userInfo',qqId);

// get box info
export const boxInfo = () => fetch('/boxInfo');
