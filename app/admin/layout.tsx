"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  User,
  Menu,
  LogOut,
  Home,
  Search,
  Settings,
  Image as ImageIcon,
  Share2,
  HelpCircle,
} from "lucide-react";

import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

/* =====================================================
   Sidebar Links
===================================================== */

const sidebarLinks = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Hero Section",
    href: "/admin/hero",
    icon: ImageIcon,
  },
  {
    label: "About Section",
    href: "/admin/about",
    icon: ImageIcon,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: ImageIcon,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ImageIcon,
  },
  {
    label: "SEO Settings",
    href: "/admin/seo",
    icon: Search,
  },
  {
    label: "Social Media",
    href: "/admin/social-media",
    icon: Share2,
  },
  {
    label: "Website Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    label: "FAQ",
    href: "/admin/faq",
    icon: HelpCircle,
  },
  {
    label: "Edit Profile",
    href: "/admin/edit-profile",
    icon: User,
  },
];

/* =====================================================
   Sidebar Props
===================================================== */

interface SidebarContentProps {
  pathname: string;
  onClickLink?: () => void;
  onLogout: () => void;
}

/* =====================================================
   Sidebar
===================================================== */

function SidebarContent({
  pathname,
  onClickLink,
  onLogout,
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col bg-white">
      {/* ================= Logo ================= */}

      <div className="px-6 py-6">
        <Link href="/" onClick={onClickLink} className="flex items-center">
          <Image
            src="/images/logo.svg"
            width={144}
            height={64}
            alt="Fresh Dairy Logo"
            priority
          />
        </Link>
      </div>

      <Separator />

      {/* ================= Navigation ================= */}

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-3 px-3 text-xs font-semibold text-muted-foreground">
          MANAGEMENT
        </p>

        <nav className="space-y-1">
          {sidebarLinks.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClickLink}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",

                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0",

                    active ? "text-blue-600" : "text-gray-400",
                  )}
                />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ================= Logout ================= */}

      <div className="border-t px-4 py-4">
        <Button
          type="button"
          onClick={onLogout}
          variant="ghost"
          className="w-full justify-start rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}

/* =====================================================
   Admin Layout
===================================================== */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  /* =====================================================
     Logout
  ===================================================== */

  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/login",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* =================================================
            Desktop Sidebar
        ================================================= */}

        <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 border-r bg-white lg:block">
          <SidebarContent pathname={pathname} onLogout={handleLogout} />
        </aside>

        {/* =================================================
            Main Area
        ================================================= */}

        <div className="min-w-0 flex-1">
          {/* =================================================
              Mobile Topbar
          ================================================= */}

          <header className="sticky top-0 z-50 border-b bg-white lg:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              {/* Title */}

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Fresh Dairy Admin
                </p>

                <p className="text-[11px] text-muted-foreground">
                  Control Panel
                </p>
              </div>

              {/* Mobile Menu */}

              <Sheet>
                <SheetTrigger
                  aria-label="Open menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Menu className="h-5 w-5" />
                </SheetTrigger>

                <SheetContent side="left" className="w-[260px] p-0">
                  <SidebarContent pathname={pathname} onLogout={handleLogout} />
                </SheetContent>
              </Sheet>
            </div>
          </header>

          {/* =================================================
              Page Content
          ================================================= */}

          <main className="p-4 sm:p-6">
            <div
              className="
                min-h-[calc(100vh-120px)]
                rounded-2xl
                border
                bg-white
                p-4
                shadow-sm
                sm:p-6
              "
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
