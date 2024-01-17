import { CheckCircle, DollarSign, Truck, Zap } from "lucide-react";

export default function Perks() {
  const perks = [
    {
      name: "Instant Delivery",
      description: "Get your camera delivered to your doorstep right away.",
      Icon: Zap,
    },
    {
      name: "Guaranteed Quality",
      description: "Every camera on our platform is verified by our team ",
      Icon: CheckCircle,
    },
    {
      name: "Best Price",
      description: "Very affordable.",
      Icon: DollarSign,
    },
    {
      name: "Free Shipping",
      description: "Not happy? We offer a 30-day refund guarantee.",
      Icon: Truck,
    },
  ];

  return (
    <div className="pt-20 pb-24">
      <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
        {perks.map((perk) => (
          <div
            key={perk.name}
            className="border text-card-foreground shadow relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent"
          >
            <div className="flex flex-col space-y-1.5 p-2">
              <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
                <div className="grid h-11 w-11 place-items-center rounded-full border-2 text-secondary">
                  {
                    <perk.Icon className="text-slate-900 w-4 h-4 dark:text-primary" />
                  }
                </div>
                <div className="p-4 flex flex-col items-center space-y-1.5">
                  <h3 className="font-semibold leading-tight tracking-tight capitalize">
                    {perk.name}
                  </h3>
                  <p className="text-sm text-center text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
