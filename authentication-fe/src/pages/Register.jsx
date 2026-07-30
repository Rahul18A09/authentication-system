import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/register.schema";
import { registerUser } from "../services/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      toast.success(response.data.message);

      reset();

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "40px auto",
      }}
    >
      <h2>Register</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="First Name"
            {...register("firstName")}
          />

          <p>{errors.firstName?.message}</p>
        </div>

        <div>
          <input
            placeholder="Last Name"
            {...register("lastName")}
          />

          <p>{errors.lastName?.message}</p>
        </div>

        <div>
          <input
            placeholder="Email"
            {...register("email")}
          />

          <p>{errors.email?.message}</p>
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
          />

          <p>{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Registering..."
            : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;