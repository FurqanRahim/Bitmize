
import savedURLService from "../services/url.services.js"
import Url from "../models/url.model.js"


export function saveURL(req,res){
    try{
    
        const url = req.body.url;
        if(req.body.slug){
                    const slug = req.body.slug
                    const shortURL = savedURLService(url,slug)
        }else{
                    const shortURL = savedURLService(url)
        }
        return res.status(200).json({url_short:process.env.APP_URL+shortURL})
    }catch(err){
        console.log(err)
    }

}

export async function redirectURL(req, res) {
    try {
        const { short_url } = req.params;
       
        
       
        const urlFind = await Url.findOneAndUpdate({ short_url }, {$inc:{clicks:1}},  { new: true });
        
        
        if (urlFind) {
           
            res.redirect(urlFind.original_url);
        } else {
            res.status(404).send({
                status: 404,
                message: 'URL NOT FOUND'
            });
        }
    } catch (error) {
        console.error("Error in redirectURL:", error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        });
    }
}