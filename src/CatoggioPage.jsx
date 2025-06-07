import NavBar from "./NavBar";
import { Card, CardContent } from "./components/ui/card";

function CatoggioPage({ onLogout }) {
  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center pt-20">
      <NavBar onLogout={onLogout} />
      <Card className="w-full max-w-3xl shadow-2xl p-6 rounded-2xl bg-white/80 backdrop-blur">
        <CardContent>
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Catoggio</h2>
        </CardContent>
      </Card>
    </div>
  );
}

export default CatoggioPage;