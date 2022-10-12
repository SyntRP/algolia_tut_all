import { autocomplete } from "@algolia/autocomplete-js";
import React, {
  createElement,
  Fragment,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { render } from "react-dom";

import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: "RECENT_SEARCH",
  limit: 3,
  // transformSource({ source, onRemove }) {
  //   return {
  //     ...source,
  //     templates: {
  //       ...source.templates,
  //       item(params) {
  //         const { item } = params;

  //         return (
  //           <a
  //             className="aa-ItemLink"
  //             href={`/algolia-search?key=${item.label}`}
  //           >
  //             {source.templates.item(params).props.children}
  //           </a>
  //         );
  //       },
  //     },
  //   };
  // },
});

export function SyntAutocompleteonly(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      plugins: [recentSearchesPlugin],
      onSubmit({ state }) {
        console.log("Submitted : ", state);
      },
      renderer: { createElement, Fragment, render },
      ...props,
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} className="aa-only" />;
}
