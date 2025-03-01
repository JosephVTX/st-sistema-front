import { useState, useEffect } from "react";
import axios from "@/libs/axios";
import { useSearchParams } from "next/navigation";

export function useFetch<T = any>(
  endpoint: string,
  acceptQueryParams: boolean = false
) {
  const searchParams = useSearchParams();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);

    // Construir la URL según si se aceptan query params o no
    const url = acceptQueryParams ? `${endpoint}?${searchParams}` : endpoint;

    axios
      .get(url)
      .then((res) => setData(res.data))
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [endpoint, searchParams, acceptQueryParams]);

  return { data, isLoading, error };
}
