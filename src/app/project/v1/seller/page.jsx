"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SellerForm from "@/component/seller/SellerForm";

export default function Page() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  return (
    <div>
      {checked ? <SellerForm /> : <div>Loading...</div>}
    </div>
  );
}