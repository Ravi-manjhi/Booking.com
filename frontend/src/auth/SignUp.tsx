import { useForm, SubmitHandler } from "react-hook-form";
import { IRegisterForm } from "../lib/types";
import { useAuthRegister } from "../lib/hooks/Hooks";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IRegisterForm>();
  const navigate = useNavigate();

  const { mutateAsync: registerFn, isPending } = useAuthRegister();

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    if (!data) return;
    registerFn(data, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-bold">Create an Account</h2>

      <div className="flex flex-col md:flex-row gap-5">
        <label
          htmlFor="firstName"
          className="text-grey-700 text-sm font-bold flex-1"
        >
          First Name
          <input
            type="text"
            id="firstName"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is Required" })}
          />
          {errors?.firstName && (
            <span className="text-red-500">{errors?.firstName?.message}</span>
          )}
        </label>

        <label
          htmlFor="lastName"
          className="text-grey-700 text-sm font-bold flex-1"
        >
          Last Name
          <input
            type="text"
            id="lastName"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is Required" })}
          />
          {errors?.lastName && (
            <span className="text-red-500">{errors?.lastName?.message}</span>
          )}
        </label>
      </div>

      <label htmlFor="email" className="text-grey-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          id="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is Required" })}
        />
        {errors?.email && (
          <span className="text-red-500">{errors?.email?.message}</span>
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
            required: "This field is Required",
            minLength: { value: 6, message: "Password no less then 6 letter" },
          })}
        />
        {errors?.password && (
          <span className="text-red-500">{errors?.password?.message}</span>
        )}
      </label>

      <label
        htmlFor="confirmPassword"
        className="text-grey-700 text-sm font-bold flex-1"
      >
        Confirm Password
        <input
          type="password"
          id="confirmPassword"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            required: "This field is Required",
            minLength: {
              value: 6,
              message: "Confirm Password no less then 6 letter",
            },
            validate: (value) => {
              if (!value) return "This field is required";
              if (watch("password") !== value) return "Your password not match";
            },
          })}
        />
        {errors?.confirmPassword && (
          <span className="text-red-500">
            {errors?.confirmPassword?.message}
          </span>
        )}
      </label>

      <div className="flex flex-col items-center w-full justify-between md:flex-row">
        <span className="text-sm">
          Already Register?{" "}
          <Link className="underline text-blue-700 font-bold" to="/sign-in">
            Sign In
          </Link>
        </span>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 px-5 rounded text-white p-2 mt-2 font-bold hover:bg-blue-400 text-xl"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default SignUp;
