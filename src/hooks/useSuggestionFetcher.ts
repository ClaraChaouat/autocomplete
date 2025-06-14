import { useEffect, useState, useCallback, useRef } from "react";
import { getSuggestions } from "../helpers/getSuggestions";
import { AUTOCOMPLETE_CONFIG } from "../constants/autocompleteConstants";
import { SuggestionItem } from "../types/suggestion";
import { VALID_INPUT_REGEX } from "../constants/input";

interface FetchState {
  suggestions: SuggestionItem[];
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
}

const initialState: FetchState = {
  suggestions: [],
  isLoading: false,
  error: null,
  isOpen: false,
};

interface UseSuggestionFetcherProps {
  query: string;
  maxSuggestions?: number;
  justSelected?: boolean;
  fetchFn?: (q: string) => Promise<SuggestionItem[]>;
}

export const useSuggestionFetcher = ({
  query,
  maxSuggestions = AUTOCOMPLETE_CONFIG.MAX_SUGGESTIONS,
  justSelected,
  fetchFn = getSuggestions,
}: UseSuggestionFetcherProps) => {
  const [state, setState] = useState<FetchState>(initialState);
  const justSelectedRef = useRef(false);

  useEffect(() => {
    justSelectedRef.current = justSelected || false;
  }, [justSelected]);

  const fetchSuggestions = useCallback(async () => {
    if (justSelectedRef.current) {
      justSelectedRef.current = false;
      return;
    }

    const trimmedQuery = query.trim();

    const isValid = VALID_INPUT_REGEX.test(trimmedQuery);
    if (
      !isValid ||
      trimmedQuery.length < AUTOCOMPLETE_CONFIG.MIN_SEARCH_LENGTH
    ) {
      setState(initialState);
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const results = await fetchFn(trimmedQuery);
      setState((prev) => {
        const nextSuggestions = results.slice(0, maxSuggestions);

        const areSame =
          prev.suggestions.length === nextSuggestions.length &&
          prev.suggestions.every(
            (item, i) => item.name === nextSuggestions[i].name
          );

        return areSame
          ? { ...prev, isLoading: false, error: null, isOpen: true }
          : {
              suggestions: nextSuggestions,
              isLoading: false,
              error: null,
              isOpen: true,
            };
      });
    } catch (err) {
      setState({
        suggestions: [],
        isLoading: false,
        error: err instanceof Error ? err.message : "Unknown error",
        isOpen: false,
      });
    }
  }, [query, maxSuggestions, fetchFn]);

  useEffect(() => {
    const debounceMs = 300;
    const timeoutId = setTimeout(fetchSuggestions, debounceMs);
    return () => clearTimeout(timeoutId);
  }, [fetchSuggestions, fetchFn]);

  return {
    ...state,
    setIsOpen: (value: boolean) =>
      setState((prev) => ({ ...prev, isOpen: value })),
  };
};
