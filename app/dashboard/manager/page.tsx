import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  redirect("/unfinished");
  return <div>This is Manager Page</div>;
};

export default page;
