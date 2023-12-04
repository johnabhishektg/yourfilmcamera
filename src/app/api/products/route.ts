import { getAllProducts } from "@/app/(actions)/product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const products = await getAllProducts();
  return NextResponse.json(products);
}
