import { useParams } from "react-router-dom";
import {
  useGetHotelById,
  useUpdateHotelById,
} from "../lib/queryHooks/myHotel.hooks";
import Loading from "../components/ui/Loading";
import ManageHotelForm from "../components/hotelForm/ManageHotelForm";

const EditHotel = () => {
  const param = useParams();
  const id = param.id as string;

  const { data, isLoading } = useGetHotelById(id);
  const { mutateAsync, isPending } = useUpdateHotelById();

  const handleSave = (formData: FormData) => {
    mutateAsync({ id, formData });
  };

  if (isLoading) return <Loading />;
  return (
    <ManageHotelForm
      onSave={handleSave}
      isLoading={isLoading || isPending}
      hotel={data}
    />
  );
};

export default EditHotel;
