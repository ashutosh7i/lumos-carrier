"use client";

import { Models } from "appwrite";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserData, logout } from "../appwrite";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData()
      .then((account) => setUser(account))
      .catch((error) => router.push("/login"));
  }, [router]);

  const handleLogOut = () => logout().then(() => router.push("/login"));

  if (!user) return <p>You arent logged in.</p>;

  return (
    <div>
      <p>Logged in as {user.email}</p>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
}
