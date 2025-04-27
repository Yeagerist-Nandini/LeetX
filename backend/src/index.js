import app from "./app.js";
import dotenv from "dotenv";

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})



// attach mode => 
// dettach mode => terminal ko chhod diya or background m chalta rhega 