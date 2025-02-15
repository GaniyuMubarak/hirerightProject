import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "../../ui/button";
import Icons from "../../ui/icons";
import { Input } from "../../ui/input";

const defaultSearch = {
  q: "",
  location: "",
  type: "",
  experience_level: "",
  salary_min: "",
  salary_max: "",
  sort_by: "",
  per_page: "",
};

export default function Filters() {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState(defaultSearch);

  const hasActiveFilters = location?.search !== "";

  const clearFilters = () => {
    setSearch(defaultSearch);
    navigate(location.pathname);
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const params = new URLSearchParams();

    Object.entries(search).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      }
    });

    navigate(`${location.pathname}?${params.toString()}`);
  };

  const handleInputChange = (key: string, value: string) => {
    const newSearch = { ...search, [key]: value };
    setSearch(newSearch);
  };

  return (
    <form onSubmit={handleSearch} className="px-4 flex items-center divide-x shadow-[0px_2px_8px_0px_#1A1A1A1F] rounded-[6px]">
      <div className="flex items-center w-full px-4">
        <Icons.search />
        <Input
          placeholder="Search by: Job title, Position or Keywords..."
          className="h-20 focus:outline-none focus-visible:ring-0 border-none shadow-none w-full text-base"
          value={search.q}
          onChange={(e) => handleInputChange("q", e.target.value)}
        />
      </div>
      <div className="flex items-center w-full px-4">
        <Icons.locationOutlined />
        <Input
          placeholder="Location"
          className="h-20 focus:outline-none focus-visible:ring-0 border-none shadow-none w-full text-base"
          value={search.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant={"secondary"}
          className={`rounded-[6px] text-[#1B1B1C] px-6 relative ${
            hasActiveFilters ? "bg-blue-50" : ""
          }`}
        >
          <Icons.filter className="min-w-6 min-h-6" />
          Filter
          {hasActiveFilters && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
          )}
        </Button>
        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            className="rounded-[6px] px-6"
            onClick={clearFilters}
          >
            Clear
          </Button>
        )}
        <Button type="submit" className="rounded-[6px] px-6">
          Search
        </Button>
      </div>
    </form>
  );
}
