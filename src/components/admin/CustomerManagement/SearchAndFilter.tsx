import { Search, Filter } from "lucide-react";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchAndFilter: React.FC<Props> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex flex-col md:flex-row gap-4">

        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Nhập tên, email để tìm kiếm ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
