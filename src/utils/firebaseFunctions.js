import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new item
export const saveItem = async (data) => {
  await setDoc(
    doc(firestore, "whiskyItems", `${Date.now()}`), //Data.now is our unique id
    data,
    // { merge: true } //merge is needed to add more fields in the future
  );
};

//Fetch whisky items
export const getAllWhiskyItems = async () => {
    const items = await getDocs(
        query(collection(firestore, "whiskyItems"), orderBy("id"))
    );
    return items.docs.map((doc) => doc.data());
};