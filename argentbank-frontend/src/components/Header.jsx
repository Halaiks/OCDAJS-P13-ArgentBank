import logo from "../assets/img/argentBankLogo.png";
export default function Header() {
  return (
    <nav className="main-nav">
      <a className="main-nav-logo" href="/">
        <img src={logo} alt="Argent Bank Logo" className="main-nav-logo-image" />
        <h1 className="sr-only">Argent Bank</h1>
      </a>

      <div>
        <a className="main-nav-item" href="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </a>
      </div>
    </nav>
  );
}