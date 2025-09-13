import {CategoriesSection} from "@/modules/search/sections/categories-section";
import {ResultsSection} from "@/modules/search/sections/results-section";

interface SearchViewProps {
    query: string | undefined;
    categoryId: string | undefined;
}
export const SearchView = ({query, categoryId} : SearchViewProps) => {
    return (
        <div className="max-w-[1300px] mx-auto mb-10 flex flex-col gap-y-6 px-2 pt-2.5">
            <CategoriesSection categoryId={categoryId} />
            <ResultsSection query={query} categoryId={categoryId} />
        </div>
    )
}