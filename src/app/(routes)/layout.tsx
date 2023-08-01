import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function routeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
