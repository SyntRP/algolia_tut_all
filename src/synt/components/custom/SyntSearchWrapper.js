import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
  Configure,
  HierarchicalMenu,
  Hits,
  HitsPerPage,
  InstantSearch,
  Menu,
  Pagination,
  RangeInput,
  RefinementList,
  SearchBox,
  SortBy,
  ToggleRefinement,
} from "react-instantsearch-hooks-web";
import { getAlgoliaResults } from "@algolia/autocomplete-js";
import "@algolia/autocomplete-theme-classic";
import { SyntAutocompleteonly } from "./SyntAutoCompleteOnly";
import { SyntAutoCompleteWithInstantSearch } from "./SyntAutoCompleteWithInstantSearch";
import { SyntHit } from "./SyntHit";
import SyntNoResultsHandler from "./SyntNoResultsHandler";
import SyntDynamicFacets from "./SyntDynamicFacets";
import { searchClient } from "../../services/SearchClient";

const searchTypeArray = [
  "AutoComplete With InstantSearch",
  "AutoComplete",
  "InstantSearch",
];

export const SyntSearchWrapper = () => {
  const [searchType, setSearchType] = useState("AutoComplete");

  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="e_com_demo">
        <Configure ruleContexts={["base_facets"]} />
        <div className="topbanner_container">
          <div className="sb_wrapper">
            {searchTypeArray.map((s) => (
              <button
                key={s}
                onClick={() => searchType !== s && setSearchType(s)}
                className={`state--button ${
                  searchType === s && "state--button_active"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {searchType === "AutoComplete With InstantSearch" && (
            <SyntAutoCompleteWithInstantSearch
              searchClient={searchClient}
              placeholder="Search products"
              initialString={""}
              detachedMediaQuery="none"
              openOnFocus
            />
          )}
          {searchType === "AutoComplete" && (
            <SyntAutocompleteonly
              openOnFocus={true}
              placeholder="Search products"
            />
          )}
          {searchType === "InstantSearch" && <SearchBox />}
        </div>
        {searchType !== "AutoComplete" && (
          <div className="full_app_container">
            <div className="search_container">
              <div className="container_left">
                <SyntDynamicFacets />
              </div>
              <SyntNoResultsHandler>
                <div className="container_right">
                  <div className="hitsperpage_wrapper">
                    <HitsPerPage
                      items={[
                        { label: "12 hits per page", value: 12, default: true },
                        { label: "20 hits per page", value: 20 },
                        { label: "36 hits per page", value: 36 },
                      ]}
                    />
                    <SortBy
                      items={[
                        { label: "Featured", value: "e_com_demo" },
                        {
                          label: "Price - Low to High",
                          value: "e_com_demo_price_low_to_high",
                        },
                        {
                          label: "Price - High to Low",
                          value: "e_com_demo_price_high_to_low",
                        },
                      ]}
                    />
                  </div>
                  <Hits hitComponent={SyntHit} />
                </div>
              </SyntNoResultsHandler>
            </div>
          </div>
        )}
      </InstantSearch>
    </>
  );
};
