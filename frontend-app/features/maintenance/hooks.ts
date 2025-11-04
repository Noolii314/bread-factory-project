import useSWR from "swr";
import type { DowntimeEvent } from "./types";

export function useDowntimeEvents(params: { from: string; to: string; assetId?: number }) {
  const q = new URLSearchParams({ from: params.from, to: params.to, ...(params.assetId ? { assetId: String(params.assetId) } : {}) });
  const { data, error, isLoading } = useSWR<DowntimeEvent[]>(`/api/maintenance/downtime?${q.toString()}`);
  return { events: data ?? [], error, isLoading };
}

