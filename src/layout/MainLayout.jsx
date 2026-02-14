import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <div>
      <Navbar />
      <main className={`min-h-screen`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
