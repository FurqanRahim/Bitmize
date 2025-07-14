import generateShortURL from "../utils/helper.js";
import {saveURLDAO} from "../Dao/url.dao.js";

export default async function  savedURLService(url,slug,userID=null){
    try{
        const shortURL = slug || generateShortURL();
       
       
        const info =await  saveURLDAO(url,shortURL,userID);
        
        
        return info
        

    }catch(err){
        console.log(err)
    }

}