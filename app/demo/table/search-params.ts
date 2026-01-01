import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server";

export const searchParamsParsers = {
  page: parseAsInteger.withDefault(1),
  pageSize: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault("createdAt.desc"),
  title: parseAsString.withDefault(""),
  status: parseAsString.withDefault(""),
  priority: parseAsString.withDefault(""),
  projectId: parseAsString.withDefault(""),
  assigneeId: parseAsString.withDefault(""),
  dateFrom: parseAsString.withDefault(""),
  dateTo: parseAsString.withDefault(""),
};

export const searchParamsCache = createSearchParamsCache(searchParamsParsers);
