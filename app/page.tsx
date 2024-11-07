// This file defines a React component for displaying featured products in a product catalog.
// It uses Next.js and Supabase for data fetching and rendering.

"use client"; // Indicates that this component is a client component in Next.js
import Link from "next/link"; // Importing Link component for client-side navigation
import { Button } from "@/components/ui/button"; // Importing a custom Button component
import { ArrowRight } from "lucide-react"; // Importing an icon for the button

import { useEffect, useState } from "react"; // Importing React hooks for state and lifecycle management
import { supabase } from "@/lib/supabase"; // Importing Supabase client for database interactions
import Image from "next/image"; // Importing Next.js Image component for optimized image loading
import { SkeletonProductCard } from "@/components/shared/loading_cards"; // Importing a loading skeleton component

// Defining the Product interface to type-check product objects
interface Product {
  id: string; // Unique identifier for the product
  name: string; // Name of the product
  description: string; // Description of the product
  price: number; // Price of the product
  category: string; // Category to which the product belongs
  image_url: string; // URL of the product image
}

// Defining the FeaturedProducts functional component
const FeaturedProducts = () => {
  // State to hold the list of products
  const [products, setProducts] = useState<Product[]>([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Function to fetch products from the Supabase database
  const fetchProducts = async () => {
    setLoading(true); // Set loading to true before fetching data

    // Fetching products from the "products" table in Supabase
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.log(error); // Log any errors that occur during fetching
      setLoading(false); // Set loading to false if there's an error
      return; // Exit the function if there's an error
    }

    // Shuffle the products array and take the first 4 items
    const shuffledProducts = data.sort(() => Math.random() - 0.5);
    setProducts(shuffledProducts.slice(0, 4)); // Update state with the first 4 shuffled products
    setLoading(false); // Set loading to false after fetching data
  };

  // useEffect hook to fetch products when the component mounts
  useEffect(() => {
    fetchProducts(); // Call the fetchProducts function
  }, []); // Empty dependency array means this runs once on mount

  // Rendering the component
  return (
    <div className="flex flex-col py-2 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-6">
        <p className="text-3xl font-bold max-w-2xl leading-tight mb-4 sm:mb-0">
          Manage your products with ease using our powerful catalog system.
          Create, update, and organize your inventory efficiently.
        </p>
        <Image
          src="/product-catalogue.png" // Image source
          alt="Product Catalogue" // Alt text for accessibility
          width={200} // Width of the image
          height={100} // Height of the image
          className="hidden sm:block rounded-md shadow-sm" // CSS classes for styling
        />
      </div>

      <div className="text-center">
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
          Featured Products
        </h2>
        <p className="mt-2 text-muted-foreground">
          Check out our most popular products
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {loading && <SkeletonProductCard length={4} />}
          {products.map(
            (
              product // Map over the products array to render each product
            ) => (
              <div
                key={product.id} // Unique key for each product
                className="bg-card rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300" // CSS classes for styling
              >
                <div className="aspect-square relative">
                  <Image
                    layout="fill" // Fill the parent container
                    src={product.image_url} // Product image URL
                    alt={product.name} // Alt text for accessibility
                    className="object-cover w-full h-full rounded-lg" // CSS classes for styling
                  />
                </div>
                <h3 className="text-lg font-bold mt-3 truncate">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mt-1 truncate">
                  {product.description}
                </p>
                <p className="text-lg font-bold mt-3">Ksh.{product.price}</p>
              </div>
            )
          )}
        </div>

        <div className="mt-8 w-full flex justify-center">
          <Button asChild>
            <Link href="/products" className="flex items-center">
              Browse All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Exporting the FeaturedProducts component for use in other parts of the application
export default FeaturedProducts;
