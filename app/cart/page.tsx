"use client";

import { supabase } from "@/lib/supabase";
import { useCart } from "@/components/shared/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@clerk/nextjs";

export default function Cart() {
  const { user } = useUser();
  const customer_id = user?.id || "none";

  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    const { error: OrderError } = await supabase.from("order").insert({
      customer_id,
      amount: total,
      status: "pending",
    });

    if (OrderError) console.log(OrderError);

    // Clear the cart after successful order
    clearCart();

    // Optionally, show a success message or redirect
    alert("Order placed successfully!");
  };

  // const placeOrder = async () => {
  //   try {

  //     // Track vendor IDs and potential errors
  //     const vendorErrors = new Set();

  //     // Process each cart item
  //     const orderItems = await Promise.all(cart.map(async (item) => {
  //       // Validate and update product inventory
  //       const { data: productData, error: productError } = await supabase
  //         .from("product_list")
  //         .select("inventory, vendor_id")
  //         .eq("id", item.id)
  //         .single();

  //       if (productError || !productData) {
  //         vendorErrors.add(item.vendor_id);
  //         return null;
  //       }

  //       // Check if enough inventory
  //       if (productData.inventory < item.quantity) {
  //         vendorErrors.add(item.vendor_id);
  //         return null;
  //       }

  //       // Update inventory
  //       const { error: updateError } = await supabase
  //         .from("product_list")
  //         .update({
  //           inventory: productData.inventory - item.quantity
  //         })
  //         .eq("id", item.id);

  //       if (updateError) {
  //         vendorErrors.add(item.vendor_id);
  //         return null;
  //       }

  //       return {
  //         vendor_id: productData.vendor_id,
  //         item_id: item.id,
  //         quantity: item.quantity,
  //         price: item.price
  //       };
  //     }));

  //     // Filter out any null items (failed processing)
  //     const validOrderItems = orderItems.filter(item => item !== null);

  //     if (validOrderItems.length === 0) {
  //       throw new Error('No valid items to order');
  //     }

  //     // Insert order
  //     const { error: orderError } = await supabase
  //       .from("orders")
  //       .insert({
  //         customer_id,
  //         amount: total,
  //         status: 'pending',
  //         // You might want to add more fields if needed
  //       })
  //       .select('id')
  //       .single();

  //     if (orderError) {
  //       throw orderError;
  //     }

  //     // If there were any vendor errors, you might want to handle them
  //     if (vendorErrors.size > 0) {
  //       console.warn('Some items could not be processed', Array.from(vendorErrors));
  //     }

  //     // Clear the cart after successful order
  //     clearCart();

  //     // Optionally, show a success message or redirect
  //     alert('Order placed successfully!');

  //   } catch (error) {
  //     console.error('Error placing order:', error);
  //     alert('Failed to place order. Please try again.');
  //   }};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="w-20"
                    />
                  </TableCell>
                  <TableCell>
                    ${(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6 flex justify-between items-center">
            <Button variant="outline" onClick={clearCart}>
              Clear Cart
            </Button>
            <div className="text-xl font-semibold">
              Total: ${total.toFixed(2)}
            </div>
          </div>
          <div className="mt-6">
            <Button size="lg" className="w-full" onClick={placeOrder}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
