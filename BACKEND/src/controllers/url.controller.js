
import savedURLService from "../services/url.services.js"
import Url from "../models/url.model.js"


export async function saveURL(req, res) {
    try {
        const url = req.body.url;
        const slug = req.body.slug;
        const userId = req.user?._id?.toString(); // Convert ObjectId to string if it exists
        
        
        
        // Case 1: Both slug and user ID are present
        if (slug && userId) {
            const shortURL =await  savedURLService(url, slug, userId);
            if (shortURL == 'Short URL already exists'){
                return res.status(400).json({ error: "Short URL already exists" });
            }
            return res.status(200).json({ url_short: process.env.APP_URL + shortURL });
        }
        
        // Case 2: Only slug is present
        if (slug) {
            const shortURL = savedURLService(url, slug);
            if (shortURL == 'Short URL already exists'){
                return res.status(400).json({ error: "Short URL already exists" });
            }
            return res.status(200).json({ url_short: process.env.APP_URL + shortURL });
        }
        
        // Case 3: Only user ID is present
        if (userId) {
            const shortURL = savedURLService(url, null, userId);
            if (shortURL == 'Short URL already exists'){
                return res.status(400).json({ error: "Short URL already exists" });
            }
            return res.status(200).json({ url_short: process.env.APP_URL + shortURL });
        }
        
        // Default case: No slug, no user ID
        const shortURL = savedURLService(url);
            if (shortURL == 'Short URL already exists'){
                return res.status(400).json({ error: "Short URL already exists" });
            }
            return res.status(200).json({ url_short: process.env.APP_URL + shortURL });
        
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export async function redirectURL(req, res) {
    try {
        const { short_url } = req.params;
        
        console.log("parameter find 111 => ", short_url);
        
        const urlFind = await Url.findOneAndUpdate(
            { short_url }, 
            { $inc: { clicks: 1 } },  
            { new: true }
        );
        
        console.log("URL FIND 111=> ", urlFind);
        
        if (urlFind) {
            return res.redirect(urlFind.original_url);
        } else {
            return res.status(404).send({
                message: 'URL NOT FOUND'
            });
        }
    } catch (error) {
        console.error("Error in redirectURL:", error);
        return res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        });
    }
}
    