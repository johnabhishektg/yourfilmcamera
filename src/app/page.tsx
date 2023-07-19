import Footer from "@/components/Footer";
import Homepage from "@/components/Homepage";
import Navbar from "@/components/Navbar";

type childrenProps = {
  children: React.ReactNode;
};

export default function Home({ children }: childrenProps) {
  return (
    <div>
      <Homepage />
    </div>
  );
}
