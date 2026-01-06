// src/hooks/queries/use-user.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useUser() {
  return useQuery({
    // Remember: This key MUST match the one you used in setQueryData from the useRegister hook
    queryKey: ["current-user"],

    // This function runs if the cache is empty (e.g. user refreshed the page)
    queryFn: async () => {
      /* const { data } = await axios.get("/api/auth/me"); // Replace with your actual fetch logic if needed
      return data;*/
      const data = null;
      return data;
    },
    // Optional: Don't re-fetch immediately if we just set the data manually
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
