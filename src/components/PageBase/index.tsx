import { Footer } from "components/Footer";
import { Header } from "components/Header";
import GameProvider from "contexts/game";
import { Outlet } from "react-router-dom";

export function PageBase() {
    
  return (
    <>
      <Header />
      <GameProvider>
        <main>
          <Outlet />
        </main>
      </GameProvider>
      <Footer />
    </>
  );
}
