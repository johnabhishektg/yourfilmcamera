import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function productsLayout({
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
