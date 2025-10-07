import { parseIdsToRequestParam } from "../../util/pathParsers";

type CreateFn = <U, I>(args: {
  fetcher: (ids: I[]) => Promise<U[]>;
  resolver: (results: U[], id: I) => U;
  scheduler: any;
}) => any;

export function makeIdBatcher<T extends { id: number }>({
  name,
  getUrlFn,
  idsKey,
  scheduler,
  createFn,
  fetchImpl = fetch,
}: {
  name: string;
  getUrlFn: (query: string) => string;
  idsKey: string;
  scheduler: any;
  createFn: CreateFn;
  fetchImpl?: typeof fetch;
}) {
  return createFn<T, number>({
    fetcher: async (ids: number[]) => {
      const res = await fetchImpl(
        getUrlFn(parseIdsToRequestParam(idsKey, ids)),
        { credentials: "include" }
      );
      if (!res.ok) throw new Error(`Failed to fetch ${name}s`);
      return res.json();
    },
    resolver: (results: T[], id: number) => {
      const hit = results.find((r) => r.id === id);
      if (!hit) throw new Error(`${name} not found: ${id}`);
      return hit;
    },
    scheduler,
  });
}
