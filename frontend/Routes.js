import Login from "./pages/Login";
import Admin from "./pages/Admin";


export function ProtectedRoute({ isAdmin , setSnackbarData}) {

  if (isAdmin) {
    return (
      <Admin setSnackbarData={setSnackbarData}/>
    );
  }

  return <div>
     User 
  </div>;
}

export function PublicRoute({ setSnackbar, setSnackbarData }) {
  return (
    <>
      <Login setSnackbar={setSnackbar} setSnackbarData={setSnackbarData} />
    </>
  );
}
