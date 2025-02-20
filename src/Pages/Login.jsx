import taskifyLogo from "../assets/taskifyLogo.svg"
import loginEnviroment from "../assets/loginEnviroment.svg"
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../hook/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { contineWithGoogle, setLoading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleLogin = () => {
        contineWithGoogle()
            .then((result) => {
                const user = result.user;
                console.log(user);
                const isSignup = parseInt(user?.metadata?.createdAt) === parseInt(user?.metadata?.lastLoginAt);
                // const isSignup = true;
                if (user) {
                    if (isSignup) {
                        const userInfo = {
                            displayName: user?.displayName,
                            email: user?.email,
                            photoURL: user?.photoURL,
                            uid: user?.uid,
                        }


                        axiosPublic.put("/users", userInfo)
                            .then(res => {
                                if (res?.data?.upsertedId) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Congratulations!",
                                        text: "Your Account has been Created",
                                    });
                                }
                            })
                            .catch(error => {
                                console.log(error);
                                setLoading(false);
                            })
                    }

                    navigate("/");

                }

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Continue with Google was Failed!",
                });
            });

    }


    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                }}>
                <div className="hero-overlay"></div>
                <div className="hero-content text-base-content">
                    <div className="card glass min-w-sm sm:min-w-md bg-base-100/95 shadow-sm">
                        <div className="card-body">
                            <div className="inline-flex items-center justify-center gap-2">
                                <div className="max-w-6 sm:max-w-8">
                                    <img className="w-full" src={taskifyLogo} alt="" />
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl text-base-content/80 font-semibold">Taskify</h1>
                                </div>
                            </div>
                            <h4 className="text-lg sm:text-xl font-semibold text-center">Welcome Back, Manager</h4>
                            <figure className="p-4">
                                <img
                                    src={loginEnviroment}
                                    alt="LoginImage" />
                            </figure>
                            <button onClick={handleGoogleLogin} className="btn btn-primary"> <FaGoogle className="mr-1"></FaGoogle> Continue With Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;