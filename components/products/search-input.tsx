'use client';

import { ChangeEvent, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput = ({ onSearch }: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    onSearch(query);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    // <div className="sticky my-5 container sm:max-w-[35vw] max-w-[75vw]">
    //   <Input
    //     type="text"
    //     value={searchTerm}
    //     onChange={handleSearchChange}
    //     placeholder="Search products..."
    //     className="backdrop-blur-sm border border-primary rounded-md p-2 w-full placeholder:text-SBP_BLUE"
    //   />
    // </div>
    <div className="sticky my-5 container sm:max-w-[35vw] max-w-[75vw]">
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search products..."
        className="backdrop-blur-sm border border-primary rounded-md p-2 w-full placeholder:text-SBP_BLUE"
      />
      {searchTerm && (
        <Button
          type="button"
          onClick={clearSearch}
          className="absolute w-auto h-auto inset-y-0 right-8 flex items-center pr-3 bg-secondary px-2 m-0.5 hover:text-SBP_YELLOW text-SBP_BLUE"
        >
          <X className="w-5 h-5 " />
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
