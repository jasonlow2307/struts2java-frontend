import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/login?username=${username}&password=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        router.replace("/menu");
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login");
    }
  };

  return (
    <div className="w-[300px] m-5">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-2.5">
          <label
            htmlFor="username"
            className="w-20 text-left text-gray-800 font-medium"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-[180px] border border-gray-300 p-1 rounded text-gray-800"
          />
        </div>
        <div className="flex items-center mb-2.5">
          <label
            htmlFor="password"
            className="w-20 text-left text-gray-800 font-medium"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[180px] border border-gray-300 p-1 rounded text-gray-800"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 font-medium"
        >
          Login
        </button>
        {errorMessage && (
          <p className="text-red-600 font-medium mt-2.5">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
