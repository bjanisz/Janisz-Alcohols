import React, { useState } from "react";
import { MdShoppingBag, MdAddCircle } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { motion } from "framer-motion";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import { Link } from "react-router-dom";
import Logo from "../img/logo.jpg";
import Avatar from "../img/avatar.jpg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

function Header() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cardShow, cardItems }, dispatch] = useStateValue();

  //creating a state from Menu dropdown
  const [isMenu, setIsMenu] = useState(false);

  //loggin in
  const login = async () => {
    //checking if user is logged in, if not trigger the login
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      //saving information to Local Storage
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  //logout (whenever clicking the button -> update state, update local storage, hide menu)
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null
    });
  };

  const showCard = () => {
    dispatch({
      type: actionType.SET_CARD_SHOW,
      cardShow: !cardShow,
    });
  }

  return (
    <header className="fixed z-50 w-screen bg-slate-700 p-3 px-4 md:p-6 md:px-16 border-b-solid border-b-2 border-b-yellow-600">
      {/*Desktop & tablet*/}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-24 object-cover rounded-md" />
          <p className="text-yellow-600 text-xl font-bold text-justify align-middle">
            Janisz Alcohols
          </p>
        </Link>

        <div className="flex items-center gap-10">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-base cursor-pointer text-yellow-600 hover:text-headingColor duration-100 transition-all ease-in-out onClick={() => setIsMenu(false)} ">
              Home
            </li>
            <li className="text-base cursor-pointer text-yellow-600 hover:text-headingColor duration-100 transition-all ease-in-out onClick={() => setIsMenu(false)}">
              Menu
            </li>
            <li className="text-base cursor-pointer text-yellow-600 hover:text-headingColor duration-100 transition-all ease-in-out onClick={() => setIsMenu(false)}">
              About Us
            </li>
            <li className="text-base cursor-pointer text-yellow-600 hover:text-headingColor duration-100 transition-all ease-in-out onClick={() => setIsMenu(false)}">
              Service
            </li>
          </motion.ul>

          <div className="relative flex items-center justify-center" onClick={showCard}>
            <MdShoppingBag className="text-yellow-600 text-2xl cursor-pointer" alt="bag"/>
            {cardItems && cardItems.length > 0 && (
            <div className="absolute -top-5 -right-2 w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="textxs text-white font-semibold">{cardItems.length}</p>
            </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt="userProfile"
              className="w-12 min-w-[48px] h-12 min-h-[48px] drop-shadow-2xl rounded-xl cursor-pointer"
              onClick={login}
            />
            {/*dropdown menu for user (add new item for admin only)*/}
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 1, scale: 1 }}
                className="w-60 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-14 right-0 px-4 py-2"
              >
                {user && user.email === "bartoszdariuszjaniszewski@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p className="m-2 p-2 flex justify-between items-center gap-3 cursor-pointer hover:bg-slate-200 transiton-all duration-100 ease-in-out text-textColor text-base"  onClick={() => setIsMenu(false)}>
                      Add new Item <MdAddCircle alt="addCircle"/>
                    </p>
                  </Link>
                )}
                <p className="m-2 p-2 rounded-md flex justify-between items-center gap-3 cursor-pointer hover:bg-slate-200 transiton-all duration-100 ease-in-out text-textColor text-base bg-slate-300" onClick={logout}>
                  Logout <GrLogout alt="logout"/>{" "}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/*mobile*/}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div className="relative flex items-center justify-center mr-4" onClick={showCard}>
            <MdShoppingBag className="text-yellow-600 text-2xl cursor-pointer" alt="bag"/>
            

            {cardItems && cardItems.length > 0 && (
            <div className="absolute -top-5 -right-2 w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="textxs text-white font-semibold">{cardItems.length}</p>
            </div>
            )}


          </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-20 object-cover rounded-md" />
          <p className="text-yellow-600 text-xl font-bold text-justify align-middle">
            Janisz Alcohols
          </p>
        </Link>


        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt="userProfile"
            className="w-12 min-w-[48px] h-12 min-h-[48px] drop-shadow-2xl rounded-xl cursor-pointer"
            onClick={login}
          />
          {/*dropdown menu for user (add new item for admin only)*/}
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 1, scale: 1 }}
              className="w-60 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-14 right-0 px-4 py-2"
            >
              {user && user.email === "bartoszdariuszjaniszewski@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="flex justify-between items-center cursor-pointer hover:bg-slate-200 transiton-all duration-100 ease-in-out text-textColor text-base px-4 py-2" onClick={() => setIsMenu(false)}>
                    Add new Item <MdAddCircle alt="addCircle"/>
                  </p>
                </Link>
              )}
              {/*for mobiles ul is inside of dropdown menu*/}
              <ul className="flex flex-col">
                <li className="text-base cursor-pointer text-yellow-600 hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-200 px-4 py-2" onClick={() => setIsMenu(false)}>
                  Home
                </li>
                <li className="text-base cursor-pointer text-yellow-600 hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-200 px-4 py-2" onClick={() => setIsMenu(false)}>
                  Menu
                </li>
                <li className="text-base cursor-pointer text-yellow-600 hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-200 px-4 py-2" onClick={() => setIsMenu(false)}>
                  About Us
                </li>
                <li className="text-base cursor-pointer text-yellow-600 hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-200 px-4 py-2" onClick={() => setIsMenu(false)}>
                  Service
                </li>
              </ul>

              <p className="m-2 p-2 rounded-md flex justify-between items-center cursor-pointer hover:bg-slate-200 transiton-all duration-100 ease-in-out text-textColor text-base px-4 py-2 bg-slate-300"
              onClick={logout}>
                Logout <GrLogout alt="logout"/>{" "}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
