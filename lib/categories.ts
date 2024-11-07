"use client";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";

export function GetCategories() {
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    setLoading(true);

    const { data, error } = await supabase.from("products").select("category");
    if (error) {
      console.error("Error fetching categories:", error.message);
      setLoading(false);
      return;
    }

    const uniqueCategories = Array.from(new Set(data.map((p) => p.category)));
    setUniqueCategories(uniqueCategories);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { uniqueCategories, loading };
}
