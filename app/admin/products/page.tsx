import { getProducts } from "@/app/api/admin/product/actions";
import ProductManager from "./ProductManager";

export default async function ProductsPage() {
  const result = await getProducts();

  return (
    <ProductManager
      initialProducts={
        result.success
          ? result.data
          : []
      }
    />
  );
}