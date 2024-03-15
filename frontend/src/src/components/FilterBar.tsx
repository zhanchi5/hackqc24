
/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

const FilterBar = () =>
{
    return (
        <div className="flex items-center bg-gray-200 py-4 px-6 mt-3">
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-2xl">
                    <label htmlFor="rent" className="font-medium">Rent</label>
                </div>
                <div className="flex items-center space-x-2">
                </div>
            </div>

            <form className="flex items-center space-x-2 ml-auto">
                <label htmlFor="minPrice" className="font-medium ">Min Price:</label>
                <input type="number" id="minPrice" className="w-20 py-1 px-4 border border-gray-300 rounded"/>

                <label htmlFor="maxPrice" className="font-medium">Max Price:</label>
                <input type="number" id="maxPrice" className="w-20 py-1 px-4 border border-gray-300 rounded"/>

                <label htmlFor="minSize" className="font-medium ">Min Size:</label>
                <input type="number" id="minSize" className="w-20 py-1 px-4 border border-gray-300 rounded"/>

                <label htmlFor="maxSize" className="font-medium">Max Size:</label>
                <input type="number" id="maxSize" className="w-20 py-1 px-4 border border-gray-300 rounded"/>

                <label htmlFor="bedrooms" className="font-medium ">Bedrooms:</label>
                <select id="bedrooms" className="py-1 px-3 border border-gray-300 rounded">
                    <option value="">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>

                <label htmlFor="bathrooms" className="font-medium">Bathrooms:</label>
                <select id="bathrooms" className="py-1 px-4 border border-gray-300 rounded ">
                    <option value="">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <button type="submit" className="flex border-black py-1 px-3 rounded bg-teal-500  ">
                    Search
                </button>
            </form>
        </div>
    );
};

export default FilterBar;