import logo from "../assets/img/argentBankLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/authSlice";
export default function Header() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const profile = useSelector((state) => state.user.profile);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img src={logo} alt="Argent Bank Logo" className="main-nav-logo-image" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {!isAuthenticated && (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}

        {isAuthenticated && (
          <>
            <Link className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {profile?.firstName}
            </Link>

            <Link
      className="main-nav-item"
      to="/login"
      onClick={(e) => {
        e.preventDefault();
        handleLogout();
      }}
    >
      Sign Out
    </Link>
          </>
        )}
      </div>
    </nav>
  );
}