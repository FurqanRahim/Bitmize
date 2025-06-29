import generateShortURL from "../utils/helper.js";
import Url from "../models/url.model.js";


export default function savedURLService(url){

    const shortURL=generateShortURL();
    const url_save = new Url({
        original_url:url,
        short_url:shortURL
    })
    url_save.save()
    return shortURL

}