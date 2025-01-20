import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface PDFPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
}

const PDFPreviewDialog = ({ open, onOpenChange, products }: PDFPreviewDialogProps) => {
  const handleDownload = () => {
    // Implement PDF generation and download logic here
    console.log("Downloading PDF for products:", products);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>PDF Preview</DialogTitle>
        </DialogHeader>
        <div className="pdf-preview min-h-[500px]">
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-muted-foreground">ID: {product.id}</p>
                <p className="text-xl font-bold mt-2">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFPreviewDialog;