import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSections from "./ImagesSections";
import { HotelFormData } from "../../lib/types";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = {
  hotel?: HotelFormData;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const navigate = useNavigate();
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSections />
        <span className="flex items-center justify-between">
          <div className="flex gap-4 ">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>

            <button
              onClick={() => reset()}
              type="reset"
              className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            >
              Reset
            </button>
          </div>

          <button
            onClick={() => navigate(-1)}
            type="button"
            className="bg-blue-600 text-white py-2 px-4 rounded font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            Back
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
