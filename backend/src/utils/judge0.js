import axios from "axios"
import dotenv from "dotenv"

dotenv.config();

export const submitBatch = async (submissions, res) => {
    try {
        const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, 
            {submissions});
    
        console.log("submission results:", data);
    
        return data;
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const getLanguageId =(language) => {
    const languages = {
        "JAVA": 62,
        "PYTHON": 70,
        "C++" : 52
    }

    return languages[language.toUpperCase()];
}


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollBatchResults = async (tokens) => {
    while(true){
        const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
            params: {
                tokens: tokens.join(','),
                base64_encoded: false,
            }
        })

        const results = data.submissions;

        const isAllDone = results.every((result) => result.status!==2 && result.status!==1);

        if(isAllDone) return results;
        await sleep(1000);
    }
}