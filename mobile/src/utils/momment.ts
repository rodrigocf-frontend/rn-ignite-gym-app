import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";

/**
 * Converte um horário (HH:mm) do backend para o horário local do dispositivo
 * @param timeString - String no formato "HH:mm" (ex: "14:00")
 * @param serverTimezone - Timezone do servidor (padrão: 'UTC')
 * @returns String no formato "HH:mm" no horário local
 */
export function convertToLocalTime(
  timeString: string,
  serverTimezone: string = "UTC"
): string {
  const [hours, minutes] = timeString.split(":").map(Number);
  const today = new Date();

  const serverDate = new TZDate(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    hours,
    minutes,
    0,
    0,
    serverTimezone
  );

  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const localDate = new TZDate(serverDate, localTimezone);

  return format(localDate, "HH:mm");
}
