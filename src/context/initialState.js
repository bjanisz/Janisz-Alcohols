import { fetchCard, fetchUser } from "../utils/fetchLocalStorageData"

//fetching user information from LocalStorage
const userInfo = fetchUser()

//fetching card information from LocalStorage

const cardInfo = fetchCard();

export const initialState = {
    user: userInfo,
    whiskyItems: null,
    cardShow: false,
    cardItems: cardInfo

}