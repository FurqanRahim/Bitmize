import generateShortURL from "../utils/helper.js";
import {saveURLDAO} from "../Dao/url.dao.js";

export default async function  savedURLService(url,slug,userID=null){
    try{
        const shortURL = slug || generateShortURL();
       
        const short_url =await  saveURLDAO(shortURL,url,userID)
        
        return short_url

    }catch(err){
        console.log(err)
    }

}