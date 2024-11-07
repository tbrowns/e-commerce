import { supabase } from "@/lib/supabase";

const mockProducts = [
  {
    name: "Wireless Charger",
    description: "Fast wireless charging pad compatible with most smartphones.",
    price: 1599,
    category: "Accessories",
    image_url:
      "https://images.unsplash.com/photo-1677870364800-5f231586d6d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdpcmVsZXNzJTIwY2hhcmdlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function populateDB() {
  mockProducts.forEach(async (product) => {
    const { error } = await supabase.from("products").insert([product]);
    if (error) {
      console.error("Error adding product:", error.message);
      return;
    }
    console.log("Form submitted:");
  });
  return <div>Populated DB</div>;
}
