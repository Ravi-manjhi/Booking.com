import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../lib/types";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>

      <label htmlFor="name" className="text-grey-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          id="name"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "This field is required" })}
        />
        {errors?.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex flex-col gap-4 md:flex-row">
        <label
          htmlFor="city"
          className="text-grey-700 text-sm font-bold flex-1"
        >
          City
          <input
            type="text"
            id="city"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "This field is required" })}
          />
          {errors?.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>

        <label
          htmlFor="country"
          className="text-grey-700 text-sm font-bold flex-1"
        >
          Country
          <input
            type="text"
            id="country"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "This field is required" })}
          />
          {errors?.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>

      <label
        htmlFor="description"
        className="text-grey-700 text-sm font-bold flex-1"
      >
        Description
        <textarea
          id="description"
          rows={5}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        />
        {errors?.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>

      <div className="flex flex-col gap-4 md:flex-row">
        <label
          htmlFor="price"
          className="text-grey-700 text-sm font-bold flex-1"
        >
          Price
          <input
            type="number"
            id="price"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("pricePerNight", {
              required: "This field is required",
            })}
          />
          {errors?.pricePerNight && (
            <span className="text-red-500">{errors.pricePerNight.message}</span>
          )}
        </label>

        <label
          htmlFor="rating"
          className="text-grey-700 text-sm font-bold flex-1"
        >
          Rating
          <select
            id="rating"
            className="border rounded w-full py-1 px-2  font-normal text-gray-700"
            {...register("starRating", { required: "this field is Required" })}
          >
            <option className="text-sm font-bold">Select as Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {errors?.starRating && (
            <span className="text-red-500">{errors.starRating.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
