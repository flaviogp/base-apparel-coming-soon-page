import HeroMobile from "/images/hero-mobile.jpg";
import HeroDesktop from "/images/hero-desktop.jpg";
import Logo from "/images/logo.svg";
import Arrowicon from "/images/icon-arrow.svg";
import { useState } from "react";

type ErrorType = {
  type: string;
  message: string;
};

function App() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ErrorType[]>([]);
  const handleChangeEmail = (value: string) => setEmail(value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailIsValid(email)) return;
    console.log("enviei");
  };

  const emailIsValid = (value: string) => {
    setErrors([]);
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = pattern.test(value);
    console.log(isValid);
    if (!isValid) {
      setErrors((prev) => [
        ...prev,
        { type: "email", message: "Please provide a valid email" },
      ]);
      console.log("errado");
    }
    console.log("verifiquei");
    return isValid;
  };

  const showErrorMessage = (type: string) => {
    const error = errors.find((err) => err.type === type);
    if (!error) return;

    return <p className="text-soft-red text-sm">{error.message}</p>;
  };

  return (
    <div className="grid place-items-center bg-[url(/images/bg-pattern-desktop.svg)] md:grid-cols-3 md:max-h-[90%] max-w-[1440px] ">
      {/* Logo  */}
      <div className="p-10 md:col-span-2 w-full max-w-[600px]">
        <img src={Logo} alt="Base Apparel" className="w-30 md:w-auto" />
      </div>
      {/* Hero Image */}
      <div className=" max-h-[315px] overflow-hidden md:max-h-full md:w-full md:min-w-[400px] row-span-2  ">
        <img
          srcSet={`${HeroMobile} 457w, ${HeroDesktop} 610w`}
          sizes="(max-width:768px) 375px, 610px"
          src={HeroMobile}
          alt=""
        />
      </div>
      {/* Content */}
      <div className="flex flex-col items-center p-10 text-center space-y-5 md:col-span-2 w-full max-w-[600px] md:space-y-10 md:items-start md:text-left">
        <h1 className="font-semibold text-dark-grayish-red tracking-[10px] text-4xl max-w-56 md:text-5xl">
          <span className="font-light text-desaturated-red">WE'RE </span>
          COMING SOON
        </h1>
        <p className="text-desaturated-red max-w-sm md:text-md">
          Hello fellow shoppers! We're currently building our new fashion store.
          Add your email below to stay up-to-date with announcements and our
          launch details.
        </p>
        <form
          action="GET"
          className=" relative overflow-hidden w-full h-10 flex justify-between md:max-w-sm "
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            className=" w-full px-5 pr-16 border border-desaturated-red rounded-full  focus:outline-desaturated-red "
            onChange={(e) => handleChangeEmail(e.currentTarget.value)}
          />
          <button
            type="submit"
            className=" cursor-pointer absolute right-0 w-14 h-full bg-gradient-to-r from-very-light-pink to-light-pink rounded-full flex justify-center items-center"
          >
            <img src={Arrowicon} alt="send email" />
          </button>
        </form>
        {showErrorMessage("email")}
      </div>
    </div>
  );
}

export default App;
