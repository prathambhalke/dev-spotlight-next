import { IoSearch } from "react-icons/io5";

type Props= {
  value : string;
  onChange : React.ChangeEventHandler<HTMLInputElement>;
  onSubmit : React.FormEventHandler<HTMLElement>;

}
const SearchAndButton = ( Props : Props) => {
  return (
    <form onSubmit={Props.onSubmit}className="flex w-full items-center gap-2 shadow-md focus-within:ring-2 dark:focus-within:ring-slate-200 focus-within:ring-slate-800 p-2 rounded-lg dark:bg-slate-800 bg-white">
      <section className="flex items-center w-full h-full gap-2">
        <IoSearch className="text-2xl text-blue-500" />
        <input
        value={Props.value}
        onChange = {Props.onChange}
          className="w-full h-[40px] rounded bg-inherit outline-none px-1 text-sm"
          type="text"
          placeholder="Search Github UserName...."
        />
      </section>
      <button className="rounded-lg text-white bg-blue-500 px-5 py-2 hover:opacity-80 transition ">
        Search
      </button>
    </form>
  );
};

export default SearchAndButton;
