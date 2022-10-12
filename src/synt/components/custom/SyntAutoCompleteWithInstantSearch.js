import React from "react";
import {
  createElement,
  ReactElement,
  Fragment,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { render } from "react-dom";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";
import { usePagination, useSearchBox } from "react-instantsearch-hooks";
import { autocomplete, AutocompleteOptions } from "@algolia/autocomplete-js";

import "@algolia/autocomplete-theme-classic";

export function SyntAutoCompleteWithInstantSearch({
  searchClient,
  initialString,
  className,
  ...autocompleteProps
}) {
  const autocompleteContainer = useRef(null);

  const { query, refine: setQuery } = useSearchBox();
  const { refine: setPage } = usePagination();

  const [instantSearchUiState, setInstantSearchUiState] = useState({
    query: initialString,
  });

  /* Uncomment for Autocomplete and recent search */

  const plugins = useMemo(() => {
    const recentSearches = createLocalStorageRecentSearchesPlugin({
      key: "RECENT_SEARCH",
      limit: 3,
      transformSource({ source }) {
        return {
          ...source,
          onSelect({ item }) {
            setInstantSearchUiState({ query: item.label });
          },
        };
      },
    });
    const querySuggestions = createQuerySuggestionsPlugin({
      searchClient,
      indexName: `e_com_demo_query_suggestions`,
      getSearchParams() {
        return recentSearches.data?.getAlgoliaSearchParams({
          hitsPerPage: 6,
        });
      },
      transformSource({ source }) {
        return {
          ...source,
          sourceId: "querySuggestionsPlugin",
          onSelect({ item }) {
            setInstantSearchUiState({ query: item.query });
          },
          getItems(params) {
            if (!params.state.query) {
              return [];
            }

            return source.getItems(params);
          },
        };
      },
    });
    return [recentSearches, querySuggestions];
  }, []);

  useEffect(() => {
    setQuery(instantSearchUiState.query);
    setPage(0);
  }, [instantSearchUiState]);

  useEffect(() => {
    if (!autocompleteContainer.current) {
      return;
    }

    const autocompleteInstance = autocomplete({
      ...autocompleteProps,
      container: autocompleteContainer.current,
      initialState: { query: initialString },
      onReset() {
        setInstantSearchUiState({ query: "" });
      },
      onSubmit({ state }) {
        setInstantSearchUiState({ query: state.query });
      },
      onStateChange({ prevState, state }) {
        if (prevState.query !== state.query) {
          setInstantSearchUiState({
            query: state.query,
          });
        }
      },

      renderer: { createElement, Fragment, render },
      plugins, // Enable for Autocomplete and recent search
    });

    return () => autocompleteInstance.destroy();
  }, [plugins]); //// add plugins as dependency if  Autocomplete and recent search enabled

  return <div className={className} ref={autocompleteContainer} />;
}
