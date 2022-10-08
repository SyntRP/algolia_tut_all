import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox } from "react-instantsearch-hooks-web";

const searchClient = algoliasearch(
  "M56FGKTRSU",
  "af5347376c60f6fc570b520cf59e001d"
);

export const SearchWrapper = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="e_com_demo">
      <SearchBox />
    </InstantSearch>
  );
};
