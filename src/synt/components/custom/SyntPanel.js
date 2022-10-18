import { useState } from "react";

export const SyntPanel = ({ show, title, children }) => {
  console.log(title)
  const [expand, setExpand] = useState(false);
  return (
    <>
      {show ? (
        <div className="ais-Panel">
          <div
            className="ais-Panel-header"
            data-expanded={expand}
            onClick={() => setExpand(!expand)}
          >
            {title}
          </div>
          <div className="ais-Panel-body" data-expanded={expand}>
            <div className="facet_container">{children}</div>
          </div>
        </div>
      ) : null}
    </>
  );
};
