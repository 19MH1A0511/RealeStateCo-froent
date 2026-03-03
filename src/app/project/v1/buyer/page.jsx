"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BuyerListView from "@/component/buyer/BuyerListView";
import CheckJwtoken from "@/component/utils/commons/checkJwtoken";

const checkToken =new CheckJwtoken();

export default function Page() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  

  useEffect(() => {
     const token = localStorage.getItem("token");
 
     if (!token) {
       router.replace("/login");
     } else {
         const isValid = checkToken.checkJwtToken(token);
         if (!isValid) {
             router.replace("/login");
         } else {
             setChecked(true);
         }
     //   setChecked(true);
     }
   }, [router]);

  return (
    <div>
      {checked ? <BuyerListView /> : <div>Loading...</div>}
    </div>
  );
}