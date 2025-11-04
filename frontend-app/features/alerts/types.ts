export type Alarm = {
  id: number;
  code: string;
  severity: "info" | "warning" | "critical";
  message: string;
  occurredAt: string;
  ackedAt?: string | null;
  clearedAt?: string | null;
};

