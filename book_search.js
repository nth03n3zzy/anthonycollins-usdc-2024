/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    //establishing an array to hold all results.
    const results = [] 
    //edge case for empty search term  
    if (searchTerm === "") {
        return { "SearchTerm": searchTerm, "Results": [] };
    }
    /* establishing a set for partial words that are broken across lines with a hiphen. so for insance when searching dark-ness 
        the searched term "dark" and "ness" do not return false results.*/
    const partialWords = new Set();

    //iterating through all the objects in the Json.file being searched
    for (const book of scannedTextObj) {
        // establishing a book consists of a Title, ISBN, and Content
        const {Title, ISBN, Content} = book;

        // iterating through all the scanable content within the book  
        for(let i = 0; i < Content.length; i++){
            //instantiating what exactly content is.
            const content = Content[i];
            const {Page, Line, Text} = content;
            
            //if a line ends witj "-" the word is continued on the next line so we must include some special handling for this.
            if (Text.endsWith("-") && i+1 < Content.length) {
                
                // we grab the text of the next line and split the words by white space.
                const nextLineWords = Content[i+1].Text.split(/\s+/);
                //we also split the current lines words by white space
                const currentLineWords = Text.split(/\s+/);

                //we slice the "-" of the last word in our current line and grab the first word in the next line to give us the complete word
                const nextLineRestOfWord = Text.slice(0,-1) + nextLineWords[0];
                //we add the pieces of the word to partialWords so that we dont get a false posiive if we search "ness" but the word is dark-ness
                partialWords.add(nextLineWords[0])
                partialWords.add(currentLineWords[currentLineWords.length - 1].slice(0,-1));
                
                // if the word is in our line of words and is not in partial words  we add the word to the list of results
                if (nextLineRestOfWord.includes(searchTerm) && !partialWords.has(searchTerm)) {
                    results.push({Title, ISBN, Page, Line})
                }
            }
                else {
                    //if there is no hiphen we just check if the text includes our word. if it does we push the result to results.
                    if (Text.includes(searchTerm) && !partialWords.has(searchTerm)) {
                        results.push({ Title, ISBN, Page, Line });
                    }
                }
            }
        }
    const result = {
        "SearchTerm": searchTerm,
        "Results": results
    };
    
    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
const multipleBooks = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "Another Book with Content",
        "ISBN": "9780000000001",
        "Content": [
            {
                "Page": 10,
                "Line": 5,
                "Text": "This is an example line for testing purposes."
            },
            {
                "Page": 10,
                "Line": 6,
                "Text": "Another line without the search term."
            },
            {
                "Page": 10,
                "Line": 7,
                "Text": "This line contains the word 'searchTerm'."
            } 
        ] 
    },
    {
        "Title": "With nonsensBooke",
        "ISBN": "9780000000002",
        "Content": [
            {
                "Page": 15,
                "Line": 3,
                "Text": "Party party PaRtY, this is a PaRtY in the hou-"
            },
            {
                "Page": 15,
                "Line": 4,
                "Text": "se dont be fooled though. we have mice in the hou-"
            },
            {
                "Page": 15,
                "Line": 5,
                "Text": "se and these mice ain't nice."
            } 
        ] 
    },
    {
        "Title": "Book without Content",
        "ISBN": "9780000000003",
        "Content": [] // No content for this book
    }
];

    
/** Example output object */
const emptySearch = {
    "SearchTerm": "notEmpty",
    "Results": []
}

const blankSearch = {
    "SearchTerm": "",
    "Results": []
}
const partySearch = {
    "SearchTerm": "PaRtY",
    "Results": [ 
        {
        "Title": "With nonsensBooke",
        "ISBN": "9780000000002",
        "Page": 15,
        "Line": 3
    }
    ]
}

const multipleBooksIn = {
    "SearchTerm": "the",
    "Results": [
        {
            "Title": "Twenty Thousand Leagues Under the Sea",
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        },
        {
            "Title": "Another Book with Content",
            "ISBN": "9780000000001",
            "Page": 10,
            "Line": 6
        },
        {
            "Title": "Another Book with Content",
            "ISBN": "9780000000001",
            "Page": 10,
            "Line": 7   
        },
        {
            "Title": "With nonsensBooke",
            "ISBN": "9780000000002",
            "Page": 15,
            "Line": 3  
        },
        {
            "Title": "With nonsensBooke",
            "ISBN": "9780000000002",
            "Page": 15,
            "Line": 4  
        },
        {
            "Title": "With nonsensBooke",
            "ISBN": "9780000000002",
            "Page": 15,
            "Line": 5  
        }

    ]
}
const canadianTest = {
    "SearchTerm": "Canadian's",
    "Results": [
        {
            "Title": "Twenty Thousand Leagues Under the Sea",
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "Title": "Twenty Thousand Leagues Under the Sea",
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}
// expected output for searching for "darkness"
const darknessSearch = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "Title": "Twenty Thousand Leagues Under the Sea",
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 8
        }
    ]
}
// expected results for searching "ness"
const nessSearch = {
    "SearchTerm": "ness",
    "Results": []
}

const darkSearch = {
    "SearchTerm": "dark",
    "Results": []
}

const multiBookeNegSearch = {
    "SearchTerm": "Omnipitent",
    "Results": []
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}
// test to check if words hifenated across lines are detected
const test3result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if(JSON.stringify(darknessSearch) === JSON.stringify(test3result)) {
    console.log("Pass: test 3");
} else {
    console.log("Fail: Test 3");
    console.log("Expected:", darknessSearch);
    console.log("Recieved:", test3result);
}
// test to see if the beggining and end of the hifenated words are returned on search
const test4result = findSearchTermInBooks("dark", twentyLeaguesIn);
if (JSON.stringify(darkSearch) == JSON.stringify(test4result)) {
    console.log("Pass: Test 4");
} else {
    console.log("Fail: Test 4");
    console.log("Expected:", darkSearch);
    console.log("Recieved:", test4result);
}
//searching and testing for partial word rejection via the word "ness"
const test5result = findSearchTermInBooks("ness", twentyLeaguesIn);
if (JSON.stringify(nessSearch) == JSON.stringify(test5result)) {
    console.log("Pass: Test 5");
} else {
    console.log("Fail: Test 5");
    console.log("Expected:", nessSearch);
    console.log("Recieved:", test5result);
}
//checking for the ability to disregard escape characters such as "\"
const test6result = findSearchTermInBooks("Canadian's", twentyLeaguesIn);
if (JSON.stringify(canadianTest) == JSON.stringify(test6result)) {
    console.log("Pass: Test 6");
} else {
    console.log("Fail: Test 6");
    console.log("Expected:", canadianTest);
    console.log("Recieved:", test6result);
}
//searching a term found in multiple books across multiple books
const test7result = findSearchTermInBooks("the", multipleBooks);
if (JSON.stringify(multipleBooksIn) == JSON.stringify(test7result)) {
    console.log("Pass: Test 7");
} else {
    console.log("Fail: Test 7");
    console.log("Expected:", multipleBooksIn);
    console.log("Recieved:", test7result);
}
//testing a term across multiple books that doesnt exist in any books
const test8result = findSearchTermInBooks("Omnipitent", multipleBooks);
if (JSON.stringify(multiBookeNegSearch) == JSON.stringify(test8result)) {
    console.log("Pass: Test 8");
} else {
    console.log("Fail: Test 8");
    console.log("Expected:", multipleBooksIn);
    console.log("Recieved:", test8result);
}
//checking for case sensitivity across multiple books
const test9result = findSearchTermInBooks("PaRtY", multipleBooks);
if (JSON.stringify(partySearch) == JSON.stringify(test9result)) {
    console.log("Pass: Test 9");
} else {
    console.log("Fail: Test 9");
    console.log("Expected:", partySearch);
    console.log("Recieved:", test9result);
}
//checking for blank search handling.
const test10result = findSearchTermInBooks("", multipleBooks);
if (JSON.stringify(blankSearch) == JSON.stringify(test10result)) {
    console.log("Pass: Test 10");
} else {
    console.log("Fail: Test 10");
    console.log("Expected:", blankSearch);
    console.log("Recieved:", test10result);
}
