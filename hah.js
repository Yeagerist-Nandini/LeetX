const fs = require('fs');
//Reading input from stdin (using fs to read all input)
const ip = "100 200"
const input = ip.trim();
const [a, b] = input.split(' ').map(Number);
console.log(a + b);


let hala = {
    "statusCode": 200,
    "data": {
        "id": "313ee53f-594b-4c93-bbd7-afe92d800574",
        "userId": "cea557f6-0ee2-4e39-bcd1-0fd9118ad1a8",
        "problemId": "0fad9f6e-e572-454e-88fa-791a25410f34",
        "sourceCode": "const fs = require('fs');\n\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\n\nconsole.log(a + b);",
        "language": "JAVASCRIPT",
        "stdin": "100 200\n-500 -600\n-10 10",
        "stdout": "[\"300\",\"-1100\",\"0\"]",
        "stderr": null,
        "compiledOutput": null,
        "status": "Accepted",
        "memory": "[\"7136 KB\",\"6956 KB\",\"6940 KB\"]",
        "time": "[\"0.066 sec\",\"0.08 sec\",\"0.099 sec\"]",
        "createdAt": "2025-05-11T16:33:16.948Z",
        "updatedAt": "2025-05-11T16:33:16.948Z",
        "testCases": [
            {
                "id": "c4fb0a8e-919e-4d89-ba32-adc995ed4977",
                "submissionId": "313ee53f-594b-4c93-bbd7-afe92d800574",
                "testCase": 1,
                "passed": true,
                "stdout": "300",
                "expectedOutput": "300",
                "stderr": null,
                "compiledOutput": null,
                "status": "Accepted",
                "memory": "7136 KB",
                "time": "0.066 sec",
                "createdAt": "2025-05-11T16:33:16.988Z",
                "updatedAt": "2025-05-11T16:33:16.988Z"
            },
            {
                "id": "04271ac9-2c7c-4179-a1c9-e42271c67122",
                "submissionId": "313ee53f-594b-4c93-bbd7-afe92d800574",
                "testCase": 2,
                "passed": true,
                "stdout": "-1100",
                "expectedOutput": "-1100",
                "stderr": null,
                "compiledOutput": null,
                "status": "Accepted",
                "memory": "6956 KB",
                "time": "0.08 sec",
                "createdAt": "2025-05-11T16:33:16.988Z",
                "updatedAt": "2025-05-11T16:33:16.988Z"
            },
            {
                "id": "8fdf00fd-d499-478c-97ea-6fe6cc7c6cc7",
                "submissionId": "313ee53f-594b-4c93-bbd7-afe92d800574",
                "testCase": 3,
                "passed": true,
                "stdout": "0",
                "expectedOutput": "0",
                "stderr": null,
                "compiledOutput": null,
                "status": "Accepted",
                "memory": "6940 KB",
                "time": "0.099 sec",
                "createdAt": "2025-05-11T16:33:16.988Z",
                "updatedAt": "2025-05-11T16:33:16.988Z"
            }
        ]
    },
    "message": "Failed to execute code",
    "success": true
}

let get_all_submission = {
    "statusCode": 200,
    "data": [
        {
            "id": "9ebf6564-077c-484b-9cb3-386816f8962d",
            "userId": "cea557f6-0ee2-4e39-bcd1-0fd9118ad1a8",
            "problemId": "0fad9f6e-e572-454e-88fa-791a25410f34",
            "sourceCode": "const fs = require('fs');\n\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\n\nconsole.log(a + b);",
            "language": "JAVASCRIPT",
            "stdin": "100 200\n-500 -600\n-10 10",
            "stdout": "[\"300\",\"-1100\",\"0\"]",
            "stderr": null,
            "compiledOutput": null,
            "status": "Accepted",
            "memory": "[\"6904 KB\",\"6716 KB\",\"6816 KB\"]",
            "time": "[\"0.347 sec\",\"0.351 sec\",\"0.34 sec\"]",
            "createdAt": "2025-05-11T16:31:05.657Z",
            "updatedAt": "2025-05-11T16:31:05.657Z"
        },
        {
            "id": "67e125a1-e6a2-499e-9311-8b9ddb52831f",
            "userId": "cea557f6-0ee2-4e39-bcd1-0fd9118ad1a8",
            "problemId": "0fad9f6e-e572-454e-88fa-791a25410f34",
            "sourceCode": "const fs = require('fs');\n\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\n\nconsole.log(a + b);",
            "language": "JAVASCRIPT",
            "stdin": "100 200\n-500 -600\n-10 10",
            "stdout": "[\"300\",\"-1100\",\"0\"]",
            "stderr": null,
            "compiledOutput": null,
            "status": "Accepted",
            "memory": "[\"6760 KB\",\"6932 KB\",\"7012 KB\"]",
            "time": "[\"0.29 sec\",\"0.289 sec\",\"0.284 sec\"]",
            "createdAt": "2025-05-11T16:32:51.375Z",
            "updatedAt": "2025-05-11T16:32:51.375Z"
        },
        {
            "id": "313ee53f-594b-4c93-bbd7-afe92d800574",
            "userId": "cea557f6-0ee2-4e39-bcd1-0fd9118ad1a8",
            "problemId": "0fad9f6e-e572-454e-88fa-791a25410f34",
            "sourceCode": "const fs = require('fs');\n\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\n\nconsole.log(a + b);",
            "language": "JAVASCRIPT",
            "stdin": "100 200\n-500 -600\n-10 10",
            "stdout": "[\"300\",\"-1100\",\"0\"]",
            "stderr": null,
            "compiledOutput": null,
            "status": "Accepted",
            "memory": "[\"7136 KB\",\"6956 KB\",\"6940 KB\"]",
            "time": "[\"0.066 sec\",\"0.08 sec\",\"0.099 sec\"]",
            "createdAt": "2025-05-11T16:33:16.948Z",
            "updatedAt": "2025-05-11T16:33:16.948Z"
        }
    ],
    "message": "submissions fetched successfully",
    "success": true
}


{
    "statusCode": 200,
    "data": [
        {
            "id": "9ebf6564-077c-484b-9cb3-386816f8962d",
            "userId": "cea557f6-0ee2-4e39-bcd1-0fd9118ad1a8",
            "problemId": "0fad9f6e-e572-454e-88fa-791a25410f34",
            "sourceCode": "const fs = require('fs');\n\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\n\nconsole.log(a + b);",
            "language": "JAVASCRIPT",
            "stdin": "100 200\n-500 -600\n-10 10",
            "stdout": "[\"300\",\"-1100\",\"0\"]",
            "stderr": null,
            "compiledOutput": null,
            "status": "Accepted",
            "memory": "[\"6904 KB\",\"6716 KB\",\"6816 KB\"]",
            "time": "[\"0.347 sec\",\"0.351 sec\",\"0.34 sec\"]",
            "createdAt": "2025-05-11T16:31:05.657Z",
            "updatedAt": "2025-05-11T16:31:05.657Z"
        },
        {
            "id": "67e125a1-e6a2-499e-9311-8b9ddb52831f",
            "userId": "cea557f6-0ee2-4e39-bcd1-0fd9118ad1a8",
            "problemId": "0fad9f6e-e572-454e-88fa-791a25410f34",
            "sourceCode": "const fs = require('fs');\n\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\n\nconsole.log(a + b);",
            "language": "JAVASCRIPT",
            "stdin": "100 200\n-500 -600\n-10 10",
            "stdout": "[\"300\",\"-1100\",\"0\"]",
            "stderr": null,
            "compiledOutput": null,
            "status": "Accepted",
            "memory": "[\"6760 KB\",\"6932 KB\",\"7012 KB\"]",
            "time": "[\"0.29 sec\",\"0.289 sec\",\"0.284 sec\"]",
            "createdAt": "2025-05-11T16:32:51.375Z",
            "updatedAt": "2025-05-11T16:32:51.375Z"
        },
        {
            "id": "313ee53f-594b-4c93-bbd7-afe92d800574",
            "userId": "cea557f6-0ee2-4e39-bcd1-0fd9118ad1a8",
            "problemId": "0fad9f6e-e572-454e-88fa-791a25410f34",
            "sourceCode": "const fs = require('fs');\n\n// Reading input from stdin (using fs to read all input)\nconst input = fs.readFileSync(0, 'utf-8').trim();\nconst [a, b] = input.split(' ').map(Number);\n\nconsole.log(a + b);",
            "language": "JAVASCRIPT",
            "stdin": "100 200\n-500 -600\n-10 10",
            "stdout": "[\"300\",\"-1100\",\"0\"]",
            "stderr": null,
            "compiledOutput": null,
            "status": "Accepted",
            "memory": "[\"7136 KB\",\"6956 KB\",\"6940 KB\"]",
            "time": "[\"0.066 sec\",\"0.08 sec\",\"0.099 sec\"]",
            "createdAt": "2025-05-11T16:33:16.948Z",
            "updatedAt": "2025-05-11T16:33:16.948Z"
        }
    ],
    "message": "submissions fetched successfully",
    "success": true
}