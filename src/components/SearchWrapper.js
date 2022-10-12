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
import { SyntAutoCompleteWithInstantSearch } from "../synt/components/custom/SyntAutoCompleteWithInstantSearch";

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

export const SearchWrapper = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="e_com_demo">
      <div className="search_container">
        <div className="container_left">
          <Panel title="BRANDS">
            <RefinementList
              attribute="brand"
              showMore={true}
              showMoreLimit={100}
              searchable={true}
            />
          </Panel>
          <Panel title="HIERARCHY">
            <HierarchicalMenu
              attributes={[
                "hierarchical_categories.lvl0",
                "hierarchical_categories.lvl1",
                "hierarchical_categories.lvl2",
              ]}
            />
          </Panel>
          <Panel title="CATEGORIES">
            <Menu
              attribute="list_categories"
              showMore={true}
              showMoreLimit={100}
            />
          </Panel>
          <Panel title="PRICE">
            <RangeInput attribute="price.value" />
          </Panel>
          <Panel title="FREE SHIPPING">
            <ToggleRefinement attribute="free_shipping" label="Free Shipping" />
          </Panel>
        </div>
        <div className="container_right">
          <SyntAutoCompleteWithInstantSearch
            searchClient={searchClient}
            placeholder="Search products"
            initialString={""}
            detachedMediaQuery="none"
            openOnFocus
          />
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
          <Hits hitComponent={Hit} />

          <Pagination className="pagination_wrapper" />
        </div>
      </div>
    </InstantSearch>
  );
};
