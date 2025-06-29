import { nanoid } from "nanoid";


export default function generateShortURL(){
    return nanoid(7);
}