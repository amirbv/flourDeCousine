import axios from 'axios';

// const API_URI = 'http://localhost:3000';
const API_URI = 'https://evening-journey-75773.herokuapp.com';

/* SESSION */

export const login = async (data) => {
  try {
    return await axios.post(`${API_URI}/api/signin/admin`, data).catch(err => {
      throw err
    })
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data
      }
    } else {
      throw err;
    }
  }
}

/* USERS */

export const createUser = async (token, data) => {
  try {
    return await axios.post(`${API_URI}/api/signup/admin`, data, {
      headers: {
        Authorization: token
      }
    }).catch(err => {
      throw err;
    })
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data
      }
    } else {
      throw err;
    }
  }
}

export const changePassword = async (token, data) => {
  try {
    return await axios.put(`${API_URI}/api/signin/admin/change`, data, {
      headers: {
        Authorization: token
      }
    }).catch(err => {
      throw err;
    })
  } catch (err) {
    if (err.response) {
      return {
        status: err.response.status,
        data: err.response.data
      }
    } else {
      throw err;
    }
  }
}

export const getUsersList = async (token) => {
  try {
    return await axios.get(`${API_URI}/api/admins`, {
      headers: {
        Authorization: token
      }
    }).catch(err => {
      throw err;
    })
  } catch (err) {
    throw err;
  }
}

export const removeUser = async (token, id) => {
  try {
    return await axios.delete(`${API_URI}/api/admin/${id}`, {
      headers: {
        Authorization: token
      }
    }).catch(err => {
      throw err;
    })
  } catch (err) {
    throw err;
  }
}

/* POSTS */

export const getPostsList = async () => {
  try {
    return await axios.get(`${API_URI}/api/posts`).catch(err => {
      throw err;
    })
  } catch (err) {
    throw err;
  }
}

export const getPost = async (id) => {
  try {
    return await axios.get(`${API_URI}/api/posts/${id}`).catch(err => {
      throw err;
    })
  } catch (err) {
    throw err;
  }
}

/* BOOKS */

export const getBooksList = async () => {
  try {
    return await axios.get(`${API_URI}/api/books`).catch(err => {
      throw err;
    })
  } catch (err) {
    throw err;
  }
}

export const addBook = async (token, data) => {

  try {
    return await axios.post(`${API_URI}/api/book/admin/`, data, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data'
      }
    }).catch(err => {
      throw err;
    })
  } catch (err) {
    throw err;
  }
}

export const removeBook = async (token, id) => {
  try {
    return await axios.delete(`${API_URI}/api/admin/books/${id}`, {
      headers: {
        Authorization: token
      }
    }).catch(err => {
      throw err;
    })
  } catch (err) {
    throw err;
  }
}

/* SALES */

export const getSalesList = async (token) => {
  try {
    return await axios.get(`${API_URI}/api/sales/admin`, {
      headers: {
        Authorization: token
      }
    }).catch(err => {
      throw err;
    })
  } catch (err) {
    throw err;
  }
}