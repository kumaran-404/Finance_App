import axios from "axios";

const baseURL = "http://localhost:3000/api";

const axiosObj = axios.create({
  baseURL,
  validateStatus: (status) => {
    return status == 200;
  },
});

axiosObj.interceptors.request.use((req) => {
  const token = localStorage.getItem("jwtToken");

  req.headers["Authorization"] = "Bearer " + token;

  return req;
});

////////////////////////////////
export const verifyJWT = async () => {
  try {
    const resp = await axiosObj.post(`/auth/verifyJWT`);

    return resp;
  } catch (err) {
    return null;
  }
};

const triggerSnackBar = (message, severity, setSnackbar, setSnackbarData) => {
  setSnackbarData({ message, severity });
  setSnackbar(true);
};

////////////////////////////////
export const login = async (data, setSnackbar, setSnackbarData) => {
  try {
    const resp = await axiosObj.post(`/auth/login`, data);

    return resp.data.data.token;
  } catch (err) {
    triggerSnackBar(
      err.response.data.error,
      "error",
      setSnackbar,
      setSnackbarData
    );
    return null;
  }
};

////////////////////////////////

export const monthWise = async (month, year) => {
  try {
    console.log(month, year);
    const resp = await axiosObj.post("/users/month", { month, year });
    return resp;
  } catch (err) {
    return null;
  }
};

/////////////////////////////////

export const searchUser = async (data) => {
  try {
    const resp = await axiosObj.post("/users/search", data);
    return resp;
  } catch (err) {
    console.log(err);
    return null;
  }
};

//////////////////////////////////

export const fetchUser = async (id) => {
  try {
    const resp = await axiosObj.get(`/users/${id}`);
    return resp;
  } catch (err) {
    console.log(err);
    return null;
  }
};

////////////////////////////////

export const updateUsers = async (data) => {
  try {
    const resp = await axiosObj.post(`/users/update`, data);
    return resp;
  } catch (err) {
    console.log(err.response);
    return null;
  }
};
//////////////////////////////////

export const createUsers = async (data) => {
  try {
    const resp = await axiosObj.post(`/users/create-users`, data);
    return resp;
  } catch (err) {
    console.log(err.response);
    return null;
  }
};