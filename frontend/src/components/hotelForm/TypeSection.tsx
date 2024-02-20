import { useFormContext } from "react-hook-form";
import { HotelTypes } from "../../lib/hotel-option-config";
import { IHotelFormData } from "../../lib/types";

const TypeSection = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<IHotelFormData>();

  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {HotelTypes.map((type) => (
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
