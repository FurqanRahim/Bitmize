import generateShortURL from "../utils/helper.js";
import {saveURLDAO} from "../Dao/url.dao.js";

export default function savedURLService(url){
    try{
        
        const shortURL=generateShortURL();
        saveURLDAO(shortURL,url)
        return shortURL

    }catch(err){
        console.log(err)
    }

}