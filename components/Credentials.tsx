"use client";

import React, { useState } from "react";
import { Check, Copy, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Credentials = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
            Demo Credentials
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Demo Access</DialogTitle>
          <DialogDescription>
            Use these credentials to sign in and test the platform.
          </DialogDescription>
        </DialogHeader>

        {/* Credentials Card */}
        <div className="rounded-lg border bg-muted/40 p-4 space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Role
            </span>
            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              Admin
            </span>
          </div>

          {/* Email Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs">
              <span className="text-muted-foreground block">Email</span>
              <span className="font-mono font-medium text-foreground">
                demo@info.com
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => copyToClipboard("demo@info.com", "email")}
            >
              {copiedField === "email" ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </Button>
          </div>

          {/* Password Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs">
              <span className="text-muted-foreground block">Password</span>
              <span className="font-mono font-medium text-foreground">
                User@001
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => copyToClipboard("User@001", "password")}
            >
              {copiedField === "password" ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Credentials;
