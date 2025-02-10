import SearchInput from "./SearchInput";
import { fetchAllForms } from "@/../lib/actions/actions";
import SearchMobile from "./SearchMobile";

export default async function Search() {
  const forms = (await fetchAllForms()) as Form[];

  return (
    <>
      <SearchInput forms={forms} />
      <SearchMobile />
    </>
  );
}
