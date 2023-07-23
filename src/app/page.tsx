import Footer from "@/components/Footer";
import Homepage from "@/components/Homepage";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import Loading from "./loading";
import React from "react";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Homepage />
      </Suspense>
      <Footer />
    </div>
  );
}
