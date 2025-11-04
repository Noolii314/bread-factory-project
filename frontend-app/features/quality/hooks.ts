// Placeholder hooks – to be wired when endpoints exist
import useSWR from "swr";
import type { DefectRate } from "./types";

export function useDefectRates(params: { from: string; to: string }) {
  const key = params ? `/api/quality/defect-rates?from=${params.from}&to=${params.to}` : null;
  const { data, error, isLoading } = useSWR<DefectRate[]>(key);
  return { data: data ?? [], error, isLoading };
}

