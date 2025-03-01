import Sidebar from "@/components/shared/sidebar";
import Header from "@/components/shared/header";
import AuthProvider from "@/providers/auth";
import { getUser } from "@/actions/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getUser();
  return (
    <AuthProvider user={user}>
      <div className="relative min-h-screen">
        <input type="checkbox" id="drawer-toggle" className="peer hidden" />

        {/* Overlay */}
        <label
          htmlFor="drawer-toggle"
          className="max-sm:fixed max-sm:inset-0 max-sm:bg-black/50 opacity-0 invisible max-sm:peer-checked:visible max-sm:peer-checked:opacity-100 duration-500 max-sm:z-40"
        />

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="sm:ml-80 sm:mr-8 max-sm:px-4 pb-4">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}
