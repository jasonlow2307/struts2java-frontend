import { useRouter } from "next/navigation"; // Changed from next/router
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  //   const [userId, setUserId] = useState<string | null>(null);

  //   useEffect(() => {
  //     // For development, set a mock user if none is found
  //     if (!userId) {
  //       setUserId("DemoUser");
  //     }
  //   }, [userId]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      router.push("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="bg-[#333] text-white p-2.5">
      {/* <span>Welcome, {userId}!</span> */}
      <button
        onClick={handleLogout}
        className="ml-5 px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
