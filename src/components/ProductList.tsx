import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Edit, Save, ImagePlus } from "lucide-react";
import PDFPreviewDialog from "./PDFPreviewDialog";
import EditProductDialog from "./EditProductDialog";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductListProps {
  searchTerm: string;
}

const ProductList = ({ searchTerm }: ProductListProps) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showPDFPreview, setShowPDFPreview] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Mock data - replace with actual data later
  const products: Product[] = [
    {
      id: "P001",
      name: "Product 1",
      price: 99.99,
      image: "/placeholder.svg",
    },
    {
      id: "P002",
      name: "Product 2",
      price: 149.99,
      image: "/placeholder.svg",
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>
        <Button
          variant="outline"
          onClick={() => setShowPDFPreview(true)}
          disabled={selectedProducts.length === 0}
        >
          <FileText className="mr-2 h-4 w-4" />
          Generate PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className={`product-card ${
              selectedProducts.includes(product.id) ? "ring-2 ring-primary" : ""
            }`}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{product.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleProductSelection(product.id)}
                >
                  {selectedProducts.includes(product.id) ? "Selected" : "Select"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="text-2xl font-bold">${product.price}</p>
              <p className="text-sm text-muted-foreground">ID: {product.id}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleEdit(product)}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <PDFPreviewDialog
        open={showPDFPreview}
        onOpenChange={setShowPDFPreview}
        products={products.filter((p) => selectedProducts.includes(p.id))}
      />

      <EditProductDialog
        product={editingProduct}
        open={!!editingProduct}
        onOpenChange={(open) => !open && setEditingProduct(null)}
        onSuccess={() => {
          setEditingProduct(null);
          // Here you would typically refresh the products list
        }}
      />
    </div>
  );
};

export default ProductList;