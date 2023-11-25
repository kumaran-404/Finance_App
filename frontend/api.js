import axios from "axios";


const axiosObj = axios.create({
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
    const resp = await axiosObj.post(`/api/auth/verifyJWT`);

    return resp;
  } catch (err) {
    return null;
  }
};

////////////////////////////////
export const login = async (data, setSnackbarData) => {
  try {
    const resp = await axiosObj.post(`/api/auth/login`, data);
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
/*
   get monthly statistics  
*/
export const monthWise = async (month, year, setSnackbarData) => {
  try {
    console.log(month, year);
    const resp = await axiosObj.post("/api/users/month", { month, year });
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
/*
   search for users 
*/
export const searchUser = async (data, setSnackbarData) => {
  try {
    const resp = await axiosObj.post("/api/users/search", data);
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
/*
   gets details of particular user
*/
export const fetchUser = async (id, setSnackbarData) => {
  try {
    const resp = await axiosObj.get(`/api/users/${id}`);

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
/*
   Move users from unpaid to paid and vice versa 
*/
export const updateUsers = async (data, setSnackbarData) => {
  try {
    const resp = await axiosObj.post(`/api/users/update`, data);

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
/*
   create set of users from excel file 
*/
export const createUsers = async (data, setSnackbarData) => {
  try {
    const resp = await axiosObj.post(`/api/users/create-users`, data);
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
