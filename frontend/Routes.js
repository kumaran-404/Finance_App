import Login from "./pages/Login";
import Admin from "./pages/Admin";


export function ProtectedRoute({ isAdmin }) {

  if (isAdmin) {
    return (
      <Admin />
    );
  }

  return <div>
     User 
  </div>;
}

export function PublicRoute() {
  return (
    <>
      <Login />
    </>
  );
}
