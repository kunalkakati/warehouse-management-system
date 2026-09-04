"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function HowToUseButton() {
  return (
    <Button
      onClick={() =>
        toast.info(
          "Upon successful execution of the contract, we will send the administrator credentials to your email and provide all necessary training.",
          {
            duration: Infinity,
            closeButton: true,
          },
        )
      }
      size="lg"
      variant="outline"
      className="w-full sm:w-auto"
    >
      How i use it for my warehouse?
    </Button>
  );
}
