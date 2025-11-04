"use client";

import { SWRConfig } from "swr";
import { defaultSWRConfig } from "@/lib/swr";
import React from "react";

type Props = { children: React.ReactNode };

export default function Providers({ children }: Props) {
  return <SWRConfig value={defaultSWRConfig}>{children}</SWRConfig>;
}

