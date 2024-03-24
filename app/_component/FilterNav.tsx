'use client';

import { Button, Checkbox } from '@nextui-org/react';
import { Dispatch, SetStateAction } from 'react';
import { HiSparkles, HiSquares2X2 } from 'react-icons/hi2';
import { MdRefresh } from 'react-icons/md';

interface Props {
  categoryList: string[];
  typeList: string[];
  setCategory: Dispatch<SetStateAction<string>>;
  setType: Dispatch<SetStateAction<string>>;
  category: string;
  type: string;
  handleSelectCategory: (category: string) => void;
  handleSelectType: (type: string) => void;
  reset: () => void;
}

const FilterNav = ({
  categoryList,
  typeList,
  category,
  type,
  handleSelectCategory,
  handleSelectType,
  reset,
}: Props) => {
  return (
    <div className="bg-[#ff0000] h-[calc(100vh-4rem)] transparent text-white relative w-[200px] transition-all duration-300 ease-in-out hidden md:flex overflow-y-auto">
      <nav className="flex flex-col justify-between inset-0 w-full">
        <ul className="my-2 flex flex-col gap-2 items-stretch">
          <li className="flex flex-col cursor-pointer transition-colors duration-300 rounded-md p-2 mx-3 gap-4">
            <div className="flex flex-col">
              <div className="flex gap-2 mb-5">
                <HiSquares2X2 className="w-6 h-6" />
                <span>Category</span>
              </div>
              <div className="flex flex-col ml-5">
                {categoryList.map((data, index) => (
                  <Checkbox
                    key={index}
                    className="inline-flex my-0.5"
                    size="md"
                    radius="sm"
                    color="success"
                    value={category}
                    isSelected={categoryList[index] === category}
                    onChange={() => {
                      handleSelectCategory(data);
                    }}
                  >
                    <span className="text-white text-medium font-bold">
                      {data}
                    </span>
                  </Checkbox>
                ))}
              </div>
            </div>
          </li>
          <li className="flex flex-col cursor-pointer transition-colors duration-300 rounded-md p-2 mx-3 gap-4">
            <div className="flex flex-col">
              <div className="flex gap-2 mb-5">
                <HiSparkles className="w-6 h-6" />
                <span>Type</span>
              </div>
              <div className="flex flex-col ml-5">
                {typeList.map((data, index) => (
                  <Checkbox
                    key={index}
                    className="inline-flex my-0.5"
                    size="md"
                    color="success"
                    radius="sm"
                    value={type}
                    isSelected={typeList[index] === type}
                    onChange={() => {
                      handleSelectType(data);
                    }}
                  >
                    <span className="text-white text-medium font-bold">
                      {data}
                    </span>
                  </Checkbox>
                ))}
              </div>
            </div>
          </li>
          <li className="flex flex-col  cursor-pointer transition-colors duration-300 rounded-md p-2 mx-3 gap-4 ">
            <Button
              size="sm"
              fullWidth
              // color="default"
              className="bg-[#1a3d57] text-white text-sm tracking-widest"
              variant="solid"
              onClick={reset}
              radius="sm"
              disableRipple
              endContent={<MdRefresh size={20} color="white" />}
            >
              Reset
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default FilterNav;
