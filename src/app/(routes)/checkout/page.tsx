import { stripeProductCheckout } from "@/lib/fetchers/stripe";
import { redirect } from "next/navigation";

const page = async () => {
  const { url } = await stripeProductCheckout();
  if (url) {
    redirect(url);
  }

  return <div>page</div>;
};

export default page;
