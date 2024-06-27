import Logo from "../assets/Logo.svg";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div
      className="bg-bglogin bg-cover bg-no-repeat h-[31vh]  opacity-90 sm:opacity-100
    sm:bg-left-bottom sm:h-[450px] relative "
    >
      <div className="pt-12 sm:pt-10">
        <div className="mx-auto">
          <img src={Logo} alt="Logo" className="mx-auto mb-6 sm:mb-3" />

          <p className="text-gray-200 text-center sm:mb-8">
            Online Project Management
          </p>
        </div>

        <div className="px-4">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
