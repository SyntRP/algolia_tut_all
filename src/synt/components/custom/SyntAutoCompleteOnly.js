import { autocomplete, getAlgoliaResults } from "@algolia/autocomplete-js";
import React, {
  createElement,
  Fragment,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { render } from "react-dom";
import { brandsPlugin } from "../plugin/BrandPlugin";
import { popularCategoriesPlugin } from "../plugin/PopularCategories";
import { productListPlugin } from "../plugin/ProductsList";
import { querySuggestionsPlugin } from "../plugin/QuerySuggestion";
import { recentSearchesPlugin } from "../plugin/RecentSearch";
import { specialProductPlugin } from "../plugin/SpecialProductPlugin";

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
        brandsPlugin,
        specialProductPlugin,
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
          brandsPlugin,
          specialProductsPlugin,
        } = elements;
        const sourceIdsToExclude = [
          "popularCategoriesPlugin",
          "specialProductsPlugin",
        ];
        const noResultsLeftSide =
          state.collections
            .filter(
              ({ source }) =>
                [...sourceIdsToExclude, "productHitPlugin"].indexOf(
                  source.sourceId
                ) === -1
            )
            .reduce((prev, curr) => prev + curr.items.length, 0) > 0;
        const hasResults =
          state.collections
            .filter(
              ({ source }) => sourceIdsToExclude.indexOf(source.sourceId) === -1
            )
            .reduce((prev, curr) => prev + curr.items.length, 0) > 0;
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
                {brandsPlugin && (
                  <Fragment>
                    <div className="aa-SourceHeader">
                      <span className="aa-SourceHeaderTitle">Top Brands</span>
                      <div className="aa-SourceHeaderLine" />
                    </div>
                    {brandsPlugin}
                  </Fragment>
                )}
                {!noResultsLeftSide && hasResults && specialProductsPlugin}
                {!hasResults && (
                  <ul>
                    <li className="noresults_text">
                      Sorry, no results found for
                      <strong>"{state?.query}"</strong>
                    </li>
                    <li>Please check your keyword</li>
                    <li>Try our Popular Categories</li>
                  </ul>
                )}
              </div>
              <div className="aa-PanelSection--right">
                {state.query && hasResults ? (
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
