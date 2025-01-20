import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, FileText, Package } from "lucide-react";
import ProductList from "@/components/ProductList";
import AddProductDialog from "@/components/AddProductDialog";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const stats = [
    {
      title: "Total Products",
      value: "24",
      icon: Package,
    },
    {
      title: "PDF Exports",
      value: "12",
      icon: FileText,
    },
    {
      title: "Categories",
      value: "5",
      icon: Package,
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Product Dashboard</h1>
        <Button onClick={() => setIsAddingProduct(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <div className="dashboard-stats">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search products by ID or name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <ProductList searchTerm={searchTerm} />

      <AddProductDialog
        open={isAddingProduct}
        onOpenChange={setIsAddingProduct}
        onSuccess={() => {
          toast({
            title: "Product added successfully",
            description: "The product has been added to your inventory.",
          });
        }}
      />
    </div>
  );
};

export default Index;