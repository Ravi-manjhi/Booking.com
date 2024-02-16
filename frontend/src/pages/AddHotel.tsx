import ManageHotelForm from "../components/hotelForm/ManageHotelForm";
import { useAddMyHotel } from "../lib/queryHooks/myHotel.hooks";

const AddHotel = () => {
  const { mutate, isPending } = useAddMyHotel();

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isPending} />;
};

export default AddHotel;
