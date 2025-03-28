import { useRouter } from "next/router";

const LogoutMessage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Call your logout API endpoint
      await fetch("/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });

      // Redirect to welcome/login page
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 font-sans">
      <div className="text-5xl text-red-600 font-bold mb-6">
        You have been logged out
      </div>
      <button
        className="text-xl px-5 py-3 bg-blue-600 text-white border-none rounded-lg cursor-pointer hover:bg-blue-700"
        onClick={handleLogout}
      >
        Back to Login
      </button>
    </div>
  );
};

export default LogoutMessage;
