import ManageHotelForm from "../components/hotelForm/ManageHotelForm";
import { useAddMyHotel } from "../lib/hooks/Hooks";

const AddHotel = () => {
  const { mutate, isPending } = useAddMyHotel();

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isPending} />;
};

export default AddHotel;
