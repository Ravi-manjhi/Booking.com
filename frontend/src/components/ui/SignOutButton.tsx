import { useNavigate } from "react-router-dom";
import { useAuthSignOut } from "../../lib/hooks/Hooks";

const SignOutButton = () => {
  const navigate = useNavigate();
  const { mutateAsync: signOutFn, isPending } = useAuthSignOut();

  const HandleClick = () => {
    signOutFn().then(() => navigate("/"));
  };

  return (
    <button
      onClick={HandleClick}
      disabled={isPending}
      className="flex items-center bg-white rounded-md text-blue-600 px-3 font-bold hover:bg-gray-100"
    >
      Logout
    </button>
  );
};

export default SignOutButton;
