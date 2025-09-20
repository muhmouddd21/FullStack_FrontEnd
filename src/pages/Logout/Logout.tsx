import { LottieHandler } from "@components/feedback";
import ActAuthLogout from "@store/Auth/Actions/ActAuthLogout";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const dispatch = useAppDispatch();
  
  const navigate = useNavigate();
  
  const { loading } = useAppSelector(state => state.Authslice);
  

   useEffect(() => {

    dispatch(ActAuthLogout())
      .unwrap()
      .then(() => {
        toast("You have been successfully logged out.",{
          theme:"dark",
        })
        navigate("/login", { replace: true });
      })
      .catch(() => {
          toast("An error occurred during logout.",{
            theme:"dark",
          })
        navigate("/login", { replace: true });
      });
  }, [dispatch, navigate]);

  return (
    <>
      {loading === "pending" && (
        <LottieHandler type="loading" message="Logging out..." />
      )}
    </>
  );
};

export default Logout;