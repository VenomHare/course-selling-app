import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Search = ({ onChange, onSubmit }: Props) => {
  return (
    <form className="w-[95%] m-2 md:m-5 flex gap-3 p-auto" onSubmit={onSubmit}>
      <Input type="text" placeholder="Search Course" onChange={onChange} />
      <Button variant={"ghost"} type="submit">
        Search
      </Button>
    </form>
  );
};

export default Search;
