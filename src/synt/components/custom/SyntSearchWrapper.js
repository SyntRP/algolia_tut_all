import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import {
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

const searchClient = algoliasearch(
  "M56FGKTRSU",
  "af5347376c60f6fc570b520cf59e001d"
);

const Hit = ({ hit }) => {
  const startIndexofColor = hit?.color?.filter_group?.indexOf("#");
  const filteredColor = hit?.color?.filter_group?.slice(startIndexofColor);
  return (
    <div className="hit_wrapper">
      <img src={hit?.image_urls[0]} style={{ width: "100%" }} />
      <p className="hits_name">{hit?.name}</p>
      <p className="hits_price">
        {hit?.price?.currency + " " + hit?.price?.value.toFixed(2)}
      </p>
      {filteredColor && (
        <div className="hit_color" style={{ backgroundColor: filteredColor }} />
      )}
    </div>
  );
};

const Panel = ({ title, children }) => {
  return (
    <div className="ais-Panel">
      <div className="ais-Panel-header">{title}</div>
      <div className="ais-Panel-body">{children}</div>
    </div>
  );
};

const searchTypeArray = [
  "AutoComplete With InstantSearch",
  "AutoComplete",
  "InstantSearch",
];

export const SyntSearchWrapper = () => {
  const [searchType, setSearchType] = useState(
    "AutoComplete With InstantSearch"
  );

  return (
    <div className="full_app_container">
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
      <InstantSearch searchClient={searchClient} indexName="e_com_demo">
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
            getSources={({ query }) => [
              {
                sourceId: "suggestions",
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: "e_com_demo_query_suggestions",
                        query,
                        params: {
                          hitsPerPage: 3,
                        },
                      },
                    ],
                  });
                },
                templates: {
                  item({ item, components }) {
                    //   return <ProductItem hit={item} components={components} />;
                    return <p>{item?.query}</p>;
                  },
                },
              },
              {
                sourceId: "hits",
                getItems() {
                  return getAlgoliaResults({
                    searchClient,
                    queries: [
                      {
                        indexName: "e_com_demo",
                        query,
                        params: {
                          hitsPerPage: 3,
                        },
                      },
                    ],
                  });
                },
                templates: {
                  item({ item, components }) {
                    //   return (
                    //     <a
                    //       href={`/${item.slug}/p/${item.sku}`}
                    //       className="my grid grid-cols-[50px_auto] grid-rows-[50px] gap-4"
                    //     >
                    //       {/* <div> */}
                    //       <img
                    //         src={item.thumbnail_url}
                    //         alt={item.model}
                    //         style={{ borderRadius: '4px' }}
                    //         className="row-span-1 h-full"
                    //       />
                    //       {/* </div> */}
                    //       <div>
                    //         <p style={{ fontWeight: '600', padding: '0' }}>{item.model}</p>
                    //         <p className=" text-sm text-gray-900">$ {item.price / 100}</p>
                    //       </div>
                    //     </a>
                    //   );
                    return <p>{item?.name}</p>;
                  },
                },
              },
            ]}
          />
        )}
        {searchType === "InstantSearch" && <SearchBox />}
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </div>
  );
};
