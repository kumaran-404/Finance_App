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

////////////////////////////////
export const login = async (data, setSnackbarData) => {
  try {
    const resp = await axiosObj.post(`/auth/login`, data);
    setSnackbarData({
      message: "Welcome back",
      severity: "success",
    });

    setTimeout(() => {}, 4000);
    return resp.data.data.token;
  } catch (err) {
    setSnackbarData({
      message: err.response.data.error,
      severity: "error",
    });

    return null;
  }
};

////////////////////////////////

export const monthWise = async (month, year, setSnackbarData) => {
  try {
    console.log(month, year);
    const resp = await axiosObj.post("/users/month", { month, year });
    return resp;
  } catch (err) {
    setSnackbarData({
      message: err.response.data.error,
      severity: "error",
    });
    return null;
  }
};

/////////////////////////////////

export const searchUser = async (data, setSnackbarData) => {
  try {
    const resp = await axiosObj.post("/users/search", data);
    return resp;
  } catch (err) {
    setSnackbarData({
      message: err.response.data.error,
      severity: "error",
    });
    return null;
  }
};

//////////////////////////////////

export const fetchUser = async (id, setSnackbarData) => {
  try {
    const resp = await axiosObj.get(`/users/${id}`);

    return resp;
  } catch (err) {
    setSnackbarData({
      message: err.response.data.error,
      severity: "error",
    });
    return null;
  }
};

////////////////////////////////

export const updateUsers = async (data, setSnackbarData) => {
  try {
    const resp = await axiosObj.post(`/users/update`, data);

    setSnackbarData({
      message: "Updated!!",
      severity: "success",
    });
    return resp;
  } catch (err) {
    setSnackbarData({
      message: err.response.data.error,
      severity: "error",
    });
    return null;
  }
};
//////////////////////////////////

export const createUsers = async (data, setSnackbarData) => {
  try {
    const resp = await axiosObj.post(`/users/create-users`, data);
    setSnackbarData({
      message: "Users created successfull",
      severity: "success",
    });
    return resp;
  } catch (err) {
    setSnackbarData({
      message: err.response.data.error,
      severity: "error",
    });
    return null;
  }
};
