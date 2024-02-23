import { AddProductForm } from "@/components/AddProductForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: "New Product",
  description: "Add a new product",
};

const page = ({}) => {
  return (
    <div className="flex justify-center items-center">
      <Card className="p-6 w-[450px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Add product</CardTitle>
          <CardDescription>Add a new product to your store</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <AddProductForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
