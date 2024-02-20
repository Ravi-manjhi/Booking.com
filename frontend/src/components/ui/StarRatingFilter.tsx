import { StarRatingProps } from "../../lib/types";

const StarRatingFilter = ({ selectedStar, onChange }: StarRatingProps) => {
  return (
    <div className="border-b border-slate-300 pd-5">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star) => (
        <label className="flex items-center space-x-2" key={star}>
          <input
            type="checkbox"
            value={star}
            className="rounded"
            checked={selectedStar.includes(star)}
            onChange={onChange}
          />
          <span>{star} Star</span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
