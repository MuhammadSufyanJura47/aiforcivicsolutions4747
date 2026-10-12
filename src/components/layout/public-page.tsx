
import type { ReactNode } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

type PublicPageProps = {
  children: ReactNode;
};

export default function PublicPage({ children }: PublicPageProps) {
  return (
    <>
      <Navbar />
      <main className="page-shell">{children}</main>
      <Footer />
    </>
  );
}
