import React, { useState } from "react";
import { motion } from "framer-motion";

import { GiSquareBottle, GiCloudUpload, GiPriceTag } from "react-icons/gi";
import { RiDeleteBack2Fill } from "react-icons/ri";

import { categories } from "../utils/data";
import Loader from "./Loader";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllWhiskyItems, saveItem } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ whiskyItems}, dispatch] = useStateValue();
  
    
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const percent = Math.floor(uploadProgress, 10).toString();
        console.log('upload percent: ', percent);
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading, try again!");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageAsset(downloadUrl);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully!");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
      );
    };
    const deleteImage = () => {
      setIsLoading(true);
      const deleteRef = ref(storage, imageAsset);
      deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true)
      setMsg("Image deleted successfully!");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const saveData = () => {
    setIsLoading(true);
    try {
      if (!title || !price || !imageAsset || !category) {
        setFields(true);
        setMsg("Please fill all the fields!");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          quantity: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data saved successfully!");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading, try again!");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };
  
  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setPrice("");
    setCategory("Select Category");
  };
  
  const fetchData = async () => {
    await getAllWhiskyItems().then((data) => {
      dispatch({
        type: actionType.SET_WHISKY_ITEMS,
        whiskyItems: data
      })
    });
  };

  return (
    <div className="w-full min-h-screen h-auto flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-yellow-800 rounded-lg p-4 flex flex-col items-center justify-center">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }
                `}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-yellow-800 flex items-center gap-2">
          <GiSquareBottle className="text-xl w-16 h-16 text-yellow-800 border-solid border-2 border-yellow-800" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg text-yellow-800 bg-transparent p-2 outline-none border-none placeholder:text-yellow-800"
          ></input>
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-2 border-yellow-800 p-2 mt-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-whote text-yellow-800"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col b-2 border-dotted border-yellow-800 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <GiCloudUpload className="text-yellow-800 text-3xl w-16 h-16 hover:text-yellow-900" />
                      <p className="text-yellow-800 hover:text-yellow-900">
                        Click to Upload file
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploadedImage"
                      className="w-full h-full object-cover mt-4"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-700 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <RiDeleteBack2Fill className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-yellow-800 flex items-center gap-2">
            <GiPriceTag className="text-xl w-16 h-16 text-yellow-800 border-solid border-2 border-yellow-800" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg text-yellow-800 bg-transparent p-2 outline-none border-none placeholder:text-yellow-800"
            ></input>
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full mt-4 h-10 border-none outline-none px-12 py-2 rounded-lg text-lg bg-yellow-800 text-white font-semibold"
            onClick={saveData}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
