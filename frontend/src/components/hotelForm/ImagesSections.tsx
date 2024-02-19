import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../lib/types";

const ImagesSections = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();
  const existingImageUrls = watch("imageUrls");

  const handleDeleteButton = (imageUrl: string) => {
    setValue(
      "imageUrls",
      existingImageUrls?.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Images</h2>
      <div className="border rounded flex flex-col gap-4 py-4 px-2">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4 border-b-[1px] border-gray-400 py-2">
            {existingImageUrls.map((url, index) => (
              <div
                className="relative group rounded overflow-hidden"
                key={index}
              >
                <img src={url} alt={`image ${index}`} />
                <button
                  onClick={() => handleDeleteButton(url as string)}
                  type="button"
                  className="absolute text-white inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center bg-blue  bg-opacity-10"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full  text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);

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
