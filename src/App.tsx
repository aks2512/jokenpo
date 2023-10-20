import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "pages/Home";
import { PageBase } from "components/PageBase";
import { Game } from "pages/Game";
import { Winner } from "pages/Winner";
import AuthProvider from "contexts/auth";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PageBase />}>
            <Route index element={<Home />} />
            <Route path="jogo" element={<Game />} />
            <Route path="vencedor" element={<Winner />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
