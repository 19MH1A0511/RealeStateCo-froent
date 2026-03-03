"use client";

import Lottie from "lottie-react";
import loadingAnimation from "../../../../public/animations/loading.json";

export default function Loader() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-40">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
}
