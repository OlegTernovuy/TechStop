import { ChangeEvent, useState } from "react";

interface IInput {
  search: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export function useInput(initialState = ""): IInput {
  const [search, setSearch] = useState(initialState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return {
    search,
    onChange,
    setSearch,
  };
}
