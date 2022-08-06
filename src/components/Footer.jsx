import { Link } from "react-router-dom";
import facebookIcon from "../img/facebook-icon.png";
import GitHubIcon from "../img/GitHub-icon.png";
import InstagramIcon from "../img/instagram-icon.png";
import Logo from "../img/logo.jpg";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <div className="bg-slate-700 flex flex-row items-center justify-around w-full h-auto mt-0 p-2 border-t-solid border-t-2 border-t-yellow-600">
      <div>
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-24 object-cover rounded-md" />
          <p className="text-yellow-600 text-xl font-bold text-justify mr-96">
            Janisz Alcohols
          </p>
        </Link>
      </div>
      <div className="flex flex-col items-center w-880 ml-32">
      <div>
        <p className="text-base cursor-pointer text-yellow-600 hover:text-white duration-100 transition-all ease-in-out p-2"> Contact: </p>
      </div>
      <div className="flex flex-row items-center justify-evenly w-full h-auto p-2" >
        <motion.a whileHover={{ scale: 1.1 }} href="https://www.facebook.com/bartoszdariuszjaniszewski" className="border-solid border-2 border-yellow-800 rounded-sm">
          <img src={facebookIcon} alt="Facebook Icon" />
        </motion.a>
        <motion.a whileHover={{ scale: 1.1 }} href="https://www.instagram.com/bjanisz_gd/" className="border-solid border-2 border-yellow-800 rounded-sm">
          <img src={InstagramIcon} alt="Instagram Icon" />
        </motion.a>
        <motion.a whileHover={{ scale: 1.1 }} href="https://github.com/bjanisz" className="border-solid border-2 border-yellow-800 rounded-sm">
          <img src={GitHubIcon} alt="GitHub Icon" />
        </motion.a>
      </div>
      </div>

    </div>
  );
}
