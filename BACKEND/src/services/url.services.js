import generateShortURL from "../utils/helper.js";
import {saveURLDAO} from "../Dao/url.dao.js";

export default function savedURLService(url,slug){
    try{
        const shortURL = slug || generateShortURL();
        saveURLDAO(shortURL,url)
        return shortURL

    }catch(err){
        console.log(err)
    }

}