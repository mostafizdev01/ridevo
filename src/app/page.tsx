
import PublicHome from "../components/home/PublicHome";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import { auth } from "../auth";
import PartnerDashboard from "../components/partner/PartnerDashboard";
import AdminDashboard from "../components/admin/AdminDashboard";

export default async function Home() {
  const session  = await auth();

  const user = session?.user;

  return (
    <div className=" min-h-screen flex flex-col">
      <Navbar />
      <div className=" flex-1">
        {user?.role === "admin" ? (
          <AdminDashboard />
        ) : user?.role === "partner" ? (
          <PartnerDashboard />
        ) : (
          <PublicHome />
        )}
      </div>
      <Footer />
    </div>
  );
}
