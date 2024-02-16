import { useForm, SubmitHandler } from "react-hook-form";
import { ISignINForm } from "../lib/types";
import { useAuthLogin } from "../lib/hooks/Hooks";
import { Link } from "react-router-dom";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignINForm>();
  const { mutateAsync: signInFn, isPending } = useAuthLogin();

  const onSubmit: SubmitHandler<ISignINForm> = (data) => {
    if (!data) return;
    signInFn(data);
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold ">Login</h2>
      <label htmlFor="email" className="text-grey-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          id="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Email is Required" })}
        />
        {errors?.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>

      <label
        htmlFor="password"
        className="text-grey-700 text-sm font-bold flex-1"
      >
        Password
        <input
          type="password"
          id="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "password is required",
            minLength: { value: 6, message: "More the 6 characters" },
          })}
        />
        {errors?.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <div className="flex flex-col items-center justify-between md:flex-row">
        <div>
          <p>
            Don't Have Account?{" "}
            <Link className="underline text-blue-700 font-bold" to="/sign-up">
              Register
            </Link>
          </p>
        </div>
        <div>
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 px-5 rounded text-white p-2 mt-2 font-bold hover:bg-blue-400 text-xl"
          >
            Sign In
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
