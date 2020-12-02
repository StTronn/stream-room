import React from "react";
import styled from "styled-components";

const Cointainer = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  padding-top: calc(100px + 3.75rem + 1.5rem);
`;

const SearchList = ({ list }) => {
  return (
    <Cointainer className="md:px-16 sm:px-4">
      <div>
        {list.map((e) => (
          <SearchItem obj={e} />
        ))}
      </div>
    </Cointainer>
  );
};

const SearchItem = ({ obj: { title } }) => <div>{title}</div>;

export default SearchList;