import debounce from "lodash.debounce";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";

export default function useQueryParams() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return Object.fromEntries(params.entries());
  }, [location.search]);

  const setQueryParam = debounce((name: string, value: string) => {
    const params = new URLSearchParams(location.search);
    if (!value) {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    navigate(`${location.pathname}?${params.toString()}`);
  }, 300);

  return { queryParams, setQueryParam };
}
