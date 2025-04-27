const healthCheck = (req, res) => {
    res.status(201).json({
        message: "Server is running",
        success: true
    });
    // return res.status(200).json(new ApiResponse(200,{message: "Server is running"}));
}

export {healthCheck}