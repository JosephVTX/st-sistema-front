import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setQueryParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const getQueryParam = useCallback(
    (key: string) => searchParams.get(key) || "",
    [searchParams]
  );

  return { setQueryParam, getQueryParam };
}
