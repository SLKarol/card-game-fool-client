import { DATE_TIME_COMMA_FORMAT } from "consts";
import { parseJSON, format } from "date-fns";

export const formatFromISO = (
  value: string,
  template: string = DATE_TIME_COMMA_FORMAT
) => format(parseJSON(value), template);
