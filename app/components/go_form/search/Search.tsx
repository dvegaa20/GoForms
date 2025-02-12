"use client";

import SearchInput from "./SearchInput";
import SearchMobile from "./SearchMobile";
import { useForms } from "@/../hooks/useForm";

export default function Search() {
  const forms = useForms();
  return (
    <>
      <SearchInput forms={forms} />
      <SearchMobile />
    </>
  );
}
