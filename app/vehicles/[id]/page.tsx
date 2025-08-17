"use client";

import { useParams } from "next/navigation";
import React from "react";


const VehicleDetailsPage = () => {
    const params = useParams();
  return <div>
    vehicle details
    <h1>id: {params.id}</h1>
  </div>;
};

export default VehicleDetailsPage;
