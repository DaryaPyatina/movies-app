import { Input } from "antd";

import "./Input-search.css";

const InputSearch = ({ setInput }) => {
  return (
    <>
      <div className="inputSearch ">
        <Input
          placeholder="Type to search..."
          style={{
            width: "auto",
            height: 35,
            flexGrow: 1,

            display: "flex",
          }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
      </div>
    </>
  );
};

export default InputSearch;
