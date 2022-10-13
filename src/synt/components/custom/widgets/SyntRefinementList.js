import React, { useEffect, useState } from "react";
import {
  RefinementList,
  useRefinementList,
} from "react-instantsearch-hooks-web";
import { SyntPanel } from "../SyntPanel";

const SyntRefinementList = (props) => {
  const { items } = useRefinementList(props);
  const { facetData, attribute } = props;
  const { isSearchable, label } = facetData;
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (items?.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [items]);
  return (
    <SyntPanel title={label || attribute} show={show}>
      <RefinementList
        attribute={attribute}
        showMore={true}
        searchable={isSearchable}
      />
    </SyntPanel>
  );
};

export default SyntRefinementList;
