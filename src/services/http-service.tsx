//eslint-disable-next-line
const axios = require('axios').default;

import Auth from 'src/helpers/Auth';
import { API } from '../config/API/api.config';
import { AesDEncrypt, AesEncrypt } from '../helpers/EncreptDecrept';
export const BaseURL = API.endpoint + '/';
export const Bucket = 'https://unicornui-development.s3.ap-south-1.amazonaws.com/';

const defaultHeaders = {
  isAuth: true,
  AdditionalParams: {},
  isJsonRequest: true,
  api_key: true
};

const signout = () => {
  localStorage.clear();
  window.location.href = '/dashboard';
};

const errorHandler = (error: any) => {
  console.log('errrrrrrrrrrrrrrrrrrrrrrr');
  if (error?.response?.status === 401) {
    // console.log("errrrrrrrrrrrrrrrrrrrrrrr")
    // localStorage.removeItem('logindata');
    // localStorage.removeItem('category');
    // localStorage.removeItem('token');
    // localStorage.removeItem('theme');
    // localStorage.clear();
    // window.location.href = '/dashboard';
  }
  return Promise.reject(error);
};
// axios.interceptors.response.use(
//   (response: any) => response,
//   (error: any) => errorHandler(error)
// );

export const ApiPostNoAuth = (type: any, userData: any) => {
  const encryptedBody = {
    data: AesEncrypt(JSON.stringify(userData))
  };
  return new Promise((resolve, reject) => {
    axios
      .post(
        BaseURL + type,
        encryptedBody,
        getHttpOptions({ ...defaultHeaders, isAuth: false })
      )
      .then((responseJson: any) => {
        const data = AesDEncrypt(responseJson?.data?.data);
        resolve({
          ...responseJson,
          data: { ...responseJson.data, data: JSON.parse(data) }
        });
      })
      .catch((error: any) => {
        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('error') &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};

export const ApiGetNoAuth = (type: any) => {
  return new Promise((resolve, reject) => {
    axios
      .get(BaseURL + type, getHttpOptions({ ...defaultHeaders, isAuth: false }))
      .then(async (responseJson: any) => {
        const data = AesDEncrypt(responseJson?.data?.data);
        resolve({
          ...responseJson,
          data: { ...responseJson.data, data: JSON.parse(data) }
        });
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

export const Api = (type: any, methodtype: any, userData: any) => {
  return new Promise((resolve, reject) => {
    userData = userData || {};
    axios({
      url: BaseURL + type,
      headers: getHttpOptions({ ...defaultHeaders, isAuth: false }),
      data: userData,
      type: methodtype
    })
      .then((responseJson: any) => {
        const decryptedData = AesDEncrypt(responseJson?.data?.data);
        resolve({ ...responseJson, data: JSON.parse(decryptedData) });
      })
      .catch((error: any) => {
        if (
          error &&
          error.hasOwnProperty('response') &&
          error.response &&
          error.response.hasOwnProperty('data') &&
          error.response.data &&
          error.response.data.hasOwnProperty('error') &&
          error.response.data.error
        ) {
          reject(error.response.data);
        } else {
          reject(error.response.data);
        }
      });
  });
};

export const ApiGet = (type: any) => {
  const loginData = JSON.parse(localStorage.getItem('logindata') as any);
  const userType = !loginData ? 0 : loginData?.userType;
  let ext = '';

  if (userType === 0) {
    ext = 'user';
  } else if (userType === 2) {
    ext = 'store_owner';
  } else {
    ext = 'admin';
  }
  return new Promise((resolve, reject) => {
    axios
      .get(
        BaseURL + ext + type,
        getHttpOptions({
          ...defaultHeaders,
          isAuth: true
        })
      )
      .then((responseJson: any) => {
        const decryptedData = AesDEncrypt(responseJson?.data?.data);
        resolve({
          ...responseJson,
          ...responseJson.data,
          data: JSON.parse(decryptedData)
        });
      })
      .catch((error: any) => {
        if (error && error.response) {
          if (error.response.status === 403 || error.response.status === 401) {
            signout();
          }
        } else {
          // console.log(error);
          reject(error.response.data);
        }
      });
  });
};

export const ApiPost = (type: any, userData: any) => {
  let ext = '';
  const loginData = JSON.parse(localStorage.getItem('logindata') as any);
  const userType = !loginData ? 0 : loginData?.userType;
  const encryptedBody = {
    data: AesEncrypt(JSON.stringify(userData))
  };

  if (userType === 0) {
    ext = 'user';
  } else if (userType === 2) {
    ext = 'store_owner';
  } else {
    ext = 'admin';
  }
  return new Promise((resolve, reject) => {
    axios
      .post(
        BaseURL + ext + type,
        encryptedBody,
        getHttpOptions({
          ...defaultHeaders,
          isAuth: true
        })
      )
      .then((responseJson: any) => {
        const decryptedData = AesDEncrypt(responseJson?.data?.data);
        resolve({
          ...responseJson,
          ...responseJson?.data,
          data: JSON.parse(decryptedData)
        });
      })
      .catch((error: any) => {
        if (error && error.response) {
          if (error.response.status === 403 || error.response.status === 401) {
            signout();
          }
        } else {
          // console.log(error);
          reject(error.response.data);
        }
      });
  });
};

export const ApiPut = (type: any, userData: any) => {
  let ext = '';
  const loginData = JSON.parse(localStorage.getItem('logindata') as any);
  const userType = !loginData ? 0 : loginData?.userType;
  const encryptedBody = {
    data: AesEncrypt(JSON.stringify(userData))
  };

  if (userType === 0) {
    ext = 'user';
  } else if (userType === 2) {
    ext = 'store_owner';
  } else {
    ext = 'admin';
  }
  return new Promise((resolve, reject) => {
    axios
      .put(
        BaseURL + ext + type,
        encryptedBody,
        getHttpOptions({ ...defaultHeaders, isAuth: true })
      )
      .then((responseJson: any) => {
        const decryptedData = AesDEncrypt(responseJson?.data?.data);
        resolve({
          ...responseJson,
          ...responseJson?.data,
          data: JSON.parse(decryptedData)
        });
      })
      .catch((error: any) => {
        if (error && error.response) {
          if (error.response.status === 403 || error.response.status === 401) {
            signout();
          }
        } else {
          // console.log(error);
          reject(error.response.data);
        }
      });
  });
};

export const ApiUpload = (type: any, userData: any, AdditionalHeader: any) => {
  return new Promise((resolve, reject) => {
    axios
      .post(BaseURL + type, userData, {
        ...getHttpOptions({ ...defaultHeaders, isAuth: true }),
        ...AdditionalHeader
      })
      .then((responseJson: any) => {
        resolve({ ...responseJson, data: responseJson?.data?.data });
      })
      .catch((error: any) => {
        if (error && error.response) {
          if (error.response.status === 403 || error.response.status === 401) {
            signout();
          }
        } else {
          // console.log(error);
          reject(error.response.data);
        }
      });
  });
};

export const ApiPatch = (type: any, userData: any) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(
        BaseURL + type,
        userData,
        getHttpOptions({ ...defaultHeaders, isAuth: true })
      )
      .then((responseJson: any) => {
        const decryptedData = AesDEncrypt(responseJson?.data?.data);
        resolve({ ...responseJson, data: JSON.parse(decryptedData) });
      })
      .catch((error: any) => {
        if (error && error.response) {
          if (error.response.status === 403 || error.response.status === 401) {
            signout();
          }
        } else {
          // console.log(error);
          reject(error.response.data);
        }
      });
  });
};

export const ApiDelete = (type: any) => {
  let ext = '';
  const loginData = JSON.parse(localStorage.getItem('logindata') as any);
  const userType = !loginData ? 0 : loginData?.userType;

  if (userType === 0) {
    ext = 'user';
  } else if (userType === 2) {
    ext = 'store_owner';
  } else {
    ext = 'admin';
  }

  return new Promise((resolve, reject) => {
    axios
      .delete(BaseURL + ext + type, getHttpOptions())
      .then((responseJson: any) => {
        const decryptedData = AesDEncrypt(responseJson?.data?.data);
        resolve({ ...responseJson, data: JSON.parse(decryptedData) });
      })
      .catch((error: any) => {
        if (error && error.response) {
          if (error.response.status === 403 || error.response.status === 401) {
            signout();
          }
        } else {
          // console.log(error);
          reject(error.response.data);
        }
      });
  });
};

export const ApiDownload = (type: any, userData: any) => {
  const method = userData && Object.keys(userData).length > 0 ? 'POST' : 'GET';
  return new Promise((resolve, reject) => {
    axios({
      url: BaseURL + type,
      method,
      headers: getHttpOptions().headers,
      responseType: 'blob',
      data: userData
    })
      .then((res: any) => resolve(new Blob([res.data])))
      .catch((error: any) => {
        if (error && error.response) {
          if (error.response.status === 403 || error.response.status === 401) {
            signout();
          }
        } else {
          // console.log(error);
          reject(error.response.data);
        }
      });
  });
};

export const ApiGetBuffer = (url: any) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      mode: 'no-cors'
    })
      .then((response: any) => {
        if (response.ok) {
          return response.buffer();
        } else {
          resolve(null);
        }
      })
      .then((buffer) => {
        resolve(buffer);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const Logout = () => {
  return ApiPost('/accounts/logout', {});
};

export const getHttpOptions = (options = defaultHeaders) => {
  let headers: any = {};

  if (options.hasOwnProperty('isAuth') && options.isAuth) {
    headers['Authorization'] = Auth.getToken();
    headers['Cache-Control'] = 'no-cache';
  }

  if (options.hasOwnProperty('isJsonRequest') && options.isJsonRequest) {
    headers['Content-Type'] = 'application/json';
  }

  if (options.hasOwnProperty('AdditionalParams') && options.AdditionalParams) {
    headers = { ...headers, ...options.AdditionalParams };
  }

  return { headers };
};
