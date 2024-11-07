"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Store, Sun, Moon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { AddProduct } from "@/app/products/product-management";

/**
 * The Header component is a sticky top bar that contains the
 * site title, navigation, and a theme switcher. It is rendered
 * on every page, and is sticky to the top of the viewport.
 */
export function Header() {
  /**
   * Get the current pathname from Next.js' router. This is
   * used to determine which nav item should be active.
   */
  const pathname = usePathname();

  /**
   * Get the theme hook from `next-themes`. This is used to
   * toggle the theme when the user clicks the theme switcher.
   */
  const { setTheme } = useTheme();

  /**
   * Define the site title. This is rendered as the main
   * content of the header.
   */
  const name = "tbrowns' Product Catalog";

  /**
   * Define the navigation items. These are rendered as a
   * list of links in the header.
   */
  const navigation = [{ name: "Products", href: "/products" }];

  return (
    <header className="sticky top-0 z-50 w-full px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex justify-around h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Store className="h-6 w-6" />
          <span className="font-bold">{name}</span>
        </Link>

        <nav className="hidden md:flex mx-6 space-x-4 flex-1">
          {/* Render the navigation items as a list of links. */}
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                /* If the current pathname matches the href of the link, make it active. */
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center mx-4 space-x-2">
          {/* Render the "Add Product" button. */}
          <AddProduct />
        </div>

        <div className="flex items-center space-x-2">
          {/* Render the theme switcher. This is a dropdown menu that allows the user to toggle the theme. */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* Render the theme options. The selected theme is determined by the `next-themes` hook. */}
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Render the menu button. This is only visible on mobile devices. */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

