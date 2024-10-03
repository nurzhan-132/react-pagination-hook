import { useState } from "react";

type FetchingCallback<T> = (...args: any[]) => Promise<T>;

export const useFetching = <T>(callback: FetchingCallback<T>) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetching = async (...args: any[]): Promise<T | void> => {
    setIsLoading(true);
    setError(null);
    try {
      return await callback(...args);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { fetching, isLoading, error };
};
