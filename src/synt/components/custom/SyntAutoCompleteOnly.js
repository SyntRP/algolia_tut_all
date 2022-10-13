import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
import React, {
  createElement,
  Fragment,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { render } from "react-dom";
import { popularCategoriesPlugin } from "../plugin/PopularCategories";
import { productListPlugin } from "../plugin/ProductsList";
import { querySuggestionsPlugin } from "../plugin/QuerySuggestion";
import { recentSearchesPlugin } from "../plugin/RecentSearch";

export function SyntAutocompleteonly(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      plugins: [
        recentSearchesPlugin,
        querySuggestionsPlugin,
        productListPlugin,
        popularCategoriesPlugin,
      ],
      onSubmit({ state }) {
        console.log("Submitted : ", state);
      },
      render({ elements, render, html, state, Fragment }, root) {
        const {
          recentSearchesPlugin,
          querySuggestionsPlugin,
          productHitPlugin,
          popularCategoriesPlugin,
        } = elements;

        render(
          <div className="aa-PanelLayout aa-Panel--scrollable">
            <div className="aa-PanelSections">
              <div className="aa-PanelSection--left">
                {recentSearchesPlugin && (
                  <Fragment>
                    <div className="aa-SourceHeader">
                      <span className="aa-SourceHeaderTitle">
                        Recent searches
                      </span>
                      <div className="aa-SourceHeaderLine" />
                    </div>
                    {recentSearchesPlugin}
                  </Fragment>
                )}
                {querySuggestionsPlugin}
              </div>
              <div className="aa-PanelSection--right">
                {state.query ? (
                  <div className="aa-PanelSection--products">
                    {productHitPlugin}
                  </div>
                ) : (
                  <div className="aa-PanelSection--popularCategories aa-PanelSection--zoomable">
                    {popularCategoriesPlugin}
                  </div>
                )}
              </div>
            </div>
          </div>,
          root
        );
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
