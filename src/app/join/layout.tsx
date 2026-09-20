import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Apply to become a member of Coder Hub. Beginners are strongly encouraged to apply!",
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
