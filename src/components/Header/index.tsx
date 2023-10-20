import { Link } from "react-router-dom";
import logo from 'assets/images/logo.png';
import './style.css';
import { useAuthContext } from "contexts/auth";

export function Header() {
  const {user, handleLogout} = useAuthContext();
  
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          <img src={logo} alt="logo ipsum" />
        </Link>
        {
          user 
            ? 
              <div 
                onClick={handleLogout}
                style={{display: 'flex', alignItems: 'center'}}
                className="button__github"
              ><img style={{marginRight: 10, borderRadius: '50%'}} width="40" height="40" src={user.avatar} alt={`${user.name} Github Logo`} />{user.name}</div>
            :
              <a 
                href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_PUBLIC_GITHUB_CLIENT_ID}`} 
                className="button__github"
              >Faça login com seu Github</a>
        }
      </div>
    </header>
  );
}
