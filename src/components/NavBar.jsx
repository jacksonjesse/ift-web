import axios from "axios";
import { Button } from "./ui/button";
import logo from "../assets/ift@2x.png";

const API_BASE = "http://localhost:8080";

function NavBar({ onLogout }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur shadow z-50">
      <nav className="max-w-3xl mx-auto flex items-center justify-between px-6 h-16">
        <div className="flex items-center">
          <img src={logo} alt="IFT Logo" className="w-14 h-auto mr-3" />
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-blue-800 font-semibold hover:underline">AFL Ladder</a>
          <Button
            onClick={async () => {
              try {
                await axios.get(`${API_BASE}/logout`, {
                  withCredentials: true,
                  maxRedirects: 0,
                  validateStatus: (status) => status >= 200 && status < 400,
                });
              } catch (e) {
                // ignore
              } finally {
                onLogout();
              }
            }}
            variant="outline"
          >
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;