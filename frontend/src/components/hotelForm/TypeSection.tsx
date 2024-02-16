import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../lib/hotel-option-config";
import { HotelFormData } from "../../lib/types";

const TypeSection = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <div
            key={type}
            className={
              typeWatch === type
                ? "curser-pointer bg-blue-300 text-sm rounded-full px-4 py-2 font-semibold"
                : "curser-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            <input
              type="radio"
              value={type}
              id={type}
              className="hidden"
              {...register("type", { required: "This field is required" })}
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
        {errors?.type && (
          <span className="text-red-500">{errors.type.message}</span>
        )}
      </div>
    </div>
  );
};

export default TypeSection;
