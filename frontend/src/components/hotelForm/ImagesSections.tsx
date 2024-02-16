import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../lib/types";

const ImagesSections = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Images</h2>
      <div className="border rounded flex flex-col gap-4 py-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full  text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              if (totalLength === 0) {
                return "At least one image should be required";
              }
              if (totalLength > 6) {
                return "Total image should be lest or equal to 6 images ";
              }

              return true;
            },
          })}
        />
        {errors.imageFiles?.message && (
          <span className="text-red-500 text-sm fold-bold">
            {errors.imageFiles?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default ImagesSections;
