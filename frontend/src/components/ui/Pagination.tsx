import { PaginationProps } from "../../lib/types";

const Pagination = ({ page, pages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
        {Array.from({ length: pages }).map((_, index) => (
          <li
            key={index}
            className={`px-2 py-1 ${page === index + 1 ? "bg-gray-200" : ""}`}
          >
            <button onClick={() => onPageChange(index + 1)}>{index + 1}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
