import useSWR from "swr";
import type { Alarm } from "./types";

export function useAlarms(params?: { onlyActive?: boolean }) {
  const key = params?.onlyActive ? "/api/alerts/alarms?active=true" : "/api/alerts/alarms";
  const { data, error, isLoading, mutate } = useSWR<Alarm[]>(key);
  return { alarms: data ?? [], error, isLoading, mutate };
}

