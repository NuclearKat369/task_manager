// import useAuth from "./useAuth";
// import AuthService from "../services/AuthService";

// const useLogout = () => {
//     const { auth, setAuth }: any = useAuth();
//     const logout = async () => {
//         setAuth({});
//         try {
//             console.log("auth in useLogout", auth);
//             const response = await AuthService.logout(auth.refreshToken);
//         }
//         catch (err) {
//             console.error(err);
//         }
//     }
//     return logout();

// }
// export default useLogout;