import { useState, useEffect, useCallback } from "react";
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

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Construir la URL según si se aceptan query params o no
      const url = acceptQueryParams ? `${endpoint}?${searchParams}` : endpoint;
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, searchParams, acceptQueryParams]);

  // Ejecutar fetchData al montar el componente y cuando cambien las dependencias
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}
