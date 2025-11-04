import useSWR from "swr";
import type { Line } from "./types";

export function useLines() {
  const { data, error, isLoading, mutate } = useSWR<Line[]>(
    "/api/production/lines"
  );
  return { lines: data ?? [], error, isLoading, mutate };
}

