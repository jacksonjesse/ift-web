import axios from "axios";
import { Button } from "./components/ui/button";
import logo from "./assets/ift@2x.png";

const API_BASE = "http://localhost:8080";

function NavBar({ onLogout, loggedIn = true }) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-b from-blue-900 to-blue-800 shadow z-50">
      <nav className="flex items-center justify-between px-6 h-16 w-full">
        <div className="flex items-center">
          <img src={logo} alt="IFT Logo" className="w-14 h-auto mr-3" />
        </div>
        {loggedIn && (
          <div className="flex items-center space-x-6">
            <a href="#" className="text-white font-semibold hover:underline">AFL Ladder</a>
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
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold"
            >
              Logout
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default NavBar;