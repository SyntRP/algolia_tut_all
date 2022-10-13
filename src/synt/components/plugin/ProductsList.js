import { getAlgoliaResults } from "@algolia/autocomplete-js";
import React from "react";
import { SyntHit } from "../custom/SyntHit";
import { ALGOLIA_PRODUCTS_INDEX_NAME } from "../../constants";
import { searchClient } from "../../services/SearchClient";

export const productListPlugin = {
  getSources({ query }) {
    if (!query) {
      return [];
    }
    return [
      {
        sourceId: "productHitPlugin",
        getItems({ setContext }) {
          return getAlgoliaResults({
            searchClient,
            queries: [
              {
                indexName: ALGOLIA_PRODUCTS_INDEX_NAME,
                query,
                params: {
                  hitsPerPage: 4,
                },
              },
            ],
            transformResponse({ hits, results }) {
              setContext({
                nbProducts: results[0]?.nbHits,
              });
              return hits;
            },
          });
        },
        templates: {
          header({ state, Fragment }) {
            return (
              <Fragment>
                <div className="aa-SourceHeaderTitle">
                  Products for {state.query} - {state.context.nbProducts}
                </div>
                <div className="aa-SourceHeaderLine" />
              </Fragment>
            );
          },
          item({ item, components }) {
            return <SyntHit hit={item} components={components} />;
          },
          //   footer({ state }) {
          //     console.log(state);
          //     return (
          //       state.context.nbProducts > 4 && (
          //         <div style={{ textAlign: "center" }}>
          //           <a
          //             href="https://example.org/"
          //             target="_blank"
          //             rel="noreferrer noopener"
          //             className="aa-SeeAllBtn"
          //           >
          //             See All Products ({state.context.nbProducts})
          //           </a>
          //         </div>
          //       )
          //     );
          //   },
        },
      },
    ];
  },
};
