
import savedURLService from "../services/url.services.js"
import Url from "../models/url.model.js"


export async function saveURL(req, res) {
    try {
        
        const url = req.body.url;
        const slug = req.body.slug;
        const userId = req.user?._id?.toString(); // Convert ObjectId to string if it exists




        // Case 1: Both slug and user ID are present
        if (slug && userId) {
            const shortURL = await savedURLService(url, slug, userId);
            if (shortURL.status == 200) {
                return res.json({ message:shortURL.message,status:shortURL.status,url:process.env.APP_URL+shortURL.url });

            }
            return res.json({ message: "Short URL already exists",status:409 });

        }

        // Case 2: Only slug is present
        if (slug) {
            const shortURL = savedURLService(url, slug);
            if (shortURL.status == 200) {
            return res.json({ message:shortURL.message,status:shortURL.status,url:process.env.APP_URL+shortURL.url });

            }
            return res.json({ message: "Short URL already exists",status:409});
        }

        // Case 3: Only user ID is present
        if (userId) {
          
            const shortURL =await  savedURLService(url, null, userId);
            
            if (shortURL.status == 200) {
                return res.json({ message:shortURL.message,status:shortURL.status,url:process.env.APP_URL+shortURL.url });

            }
            return res.json({ message: "Short URL already exists",status:409 });
        }

        // Default case: No slug, no user ID
        
        const shortURL = savedURLService(url);
       
        if (shortURL.status == 200) {
            return res.json({ message:shortURL.message,status:shortURL.status,url:process.env.APP_URL+shortURL.url });

        }
        return res.json({ message: "Short URL already exists",status:409 });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export async function redirectURL(req, res) {
    try {
        const { short_url } = req.params;

        // Validate short_url parameter
        if (!short_url || typeof short_url !== 'string' || short_url.trim().length === 0) {
            console.error('Invalid short URL parameter:', short_url);
            return res.status(400).json({
                status: 400,
                message: 'Invalid short URL parameter',
            });
        }

        // Add protocol if missing from original URL
        const ensureProtocol = (url) => {
            if (!/^https?:\/\//i.test(url)) {
                return `http://${url}`;
            }
            return url;
        };

        const urlFind = await Url.findOneAndUpdate(
            { short_url: short_url.trim() }, // Trim whitespace
            { $inc: { clicks: 1 } },
            {
                new: true,
                maxTimeMS: 5000 // Timeout after 5 seconds
            }
        );

        console.log("Redirect attempt - Short URL:", short_url, "Found:", !!urlFind);

        if (urlFind) {
            const destinationUrl = ensureProtocol(urlFind.original_url);
            console.log(`Redirecting to: ${destinationUrl}`);
            return res.redirect(302, destinationUrl);
        }

        console.warn('Short URL not found:', short_url);
        return res.status(404).json({
            status: 404,
            message: 'URL not found',
            suggestion: 'Check if the short URL is correct'
        });

    } catch (error) {
        console.error("Redirect error:", {
            error: error.message,
            stack: error.stack,
            params: req.params
        });

        if (error.name === 'MongoTimeoutError') {
            return res.status(503).json({
                status: 503,
                message: 'Service temporarily unavailable',
            });
        }

        return res.status(500).json({
            status: 500,
            message: 'Internal server error',
            requestId: req.id // If you have request IDs
        });
    }
}



export const getAllURL = async (req, res) => {
    try {
        if (!req.user?._id) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        console.log("BACKEND GETALL URLS ================================>",req.user)
        console.log("BACKEND GETALL URLS BY USER ID================================>",req.user)


        const urls = await Url.find({user: req.user._id }); // Fixed query
        console.log("GET ALL USER CONTROLLER of URLS BACKEND ===============================>",urls)
        
        res.status(200).json({
            status: 200,
            data: urls,
            message: "URLs retrieved successfully"
        });
        console.log("URLS RETRIEVED SUCCESSFULLY BACKEND ==============================>")
    } catch (err) {
        console.error("Error in getAllURL:", err);
        console.log("GETALLUSER ERROR RECEIEVED =======================================>")
        res.status(500).json({ 
            status: 500,
            error: "Internal server error",
            details: err.message 
        });
    }
}


