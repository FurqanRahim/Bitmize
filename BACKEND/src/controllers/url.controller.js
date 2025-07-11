
import savedURLService from "../services/url.services.js"
import Url from "../models/url.model.js"


export function saveURL(req, res) {
    try {
        const url = req.body.url;
        const slug = req.body.slug;
        const userId = req.user?._id?.toString(); // Convert ObjectId to string if it exists
        
        
        
        // Case 1: Both slug and user ID are present
        if (slug && userId) {
            const shortURL = savedURLService(url, slug, userId);
            return res.status(200).json({ url_short: process.env.APP_URL + shortURL });
        }
        
        // Case 2: Only slug is present
        if (slug) {
            const shortURL = savedURLService(url, slug);
            return res.status(200).json({ url_short: process.env.APP_URL + shortURL });
        }
        
        // Case 3: Only user ID is present
        if (userId) {
            const shortURL = savedURLService(url, null, userId);
            return res.status(200).json({ url_short: process.env.APP_URL + shortURL });
        }
        
        // Default case: No slug, no user ID
        const shortURL = savedURLService(url);
        return res.status(200).json({ url_short: process.env.APP_URL + shortURL });
        
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
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