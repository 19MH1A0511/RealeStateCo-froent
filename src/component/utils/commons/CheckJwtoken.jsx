
import { jwtDecode } from "jwt-decode";



//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.replace("/login");
//       return;
//     }

//     try {
//       const decoded = jwtDecode(token);
//       const currentTime = Date.now() / 1000; // convert to seconds

//       if (decoded.exp < currentTime) {
//         // Token expired
//         localStorage.removeItem("token");
//         router.replace("/login");
//       } else {
//         setChecked(true);
//       }
//     } catch (error) {
//       // Invalid token
//       localStorage.removeItem("token");
//       router.replace("/login");
//     }
//   }, [router]);


class CheckJwtToken {

    checkJwtToken = (token) => {
        if (!token) {
            return false;
        };
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                localStorage.removeItem("token");
                return false;
            }
            return true;
        } catch (error) {
            // Invalid token
            localStorage.removeItem("token");
            return false;
        }
    };
};

export default CheckJwtToken;