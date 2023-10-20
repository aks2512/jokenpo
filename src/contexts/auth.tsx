import { IUser } from "interfaces/IUser";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { api } from "lib/api";
import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

interface IAuthProviderProps {
  children: ReactElement;
}

interface IAuthContext {
  user?: IUser;
  setUser?: Function;
}

const AuthContext = createContext<IAuthContext>({});
AuthContext.displayName = "Auth";

export default function AuthProvider(props: IAuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | undefined>();

  function handleLogin() {
    const { searchParams } = new URL(window.location.href);
    const code = searchParams.get("code");

    if (code !== null) {
      if (Cookies.get("token") === undefined) {
        api
          .post("/register", {
            code,
          })
          .then((response) => {
            const { token } = response.data;

            Cookies.set("token", token, { expires: 30 });
            setUser(jwtDecode(token));
          });
      }
      navigate("/");
    }

    const token = Cookies.get("token");
    if (token !== undefined) {
      setUser(jwtDecode(token));
    } else {
      setUser(undefined);
    }
  }

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    if (setUser) {
        setUser(undefined)
        Cookies.remove("token");
        navigate("/");
    }
  }

  return {
    user,
    handleLogout,
  };
}
