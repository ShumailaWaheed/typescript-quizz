#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const gradientColors = [
    '#FF0000',
    '#FFA500',
    '#FFFF00',
    '#008000',
    '#0000FF',
    '#4B0082',
    '#EE82EE'
];
const gradientColor = (text) => {
    return text
        .split('')
        .map((char, index) => chalk.hex(gradientColors[index % gradientColors.length])(char))
        .join('');
};
const typewriterEffect = async (text, delayTime = 5) => {
    for (const char of text) {
        process.stdout.write(char);
        await delay(delayTime);
    }
    console.log(''); // Move cursor to next line after typing effect
};
const countdown = async (number) => {
    const color = gradientColors[number % gradientColors.length];
    process.stdout.write(chalk.hex(color)(`${number}... `));
    await delay(1000);
    process.stdout.write('\b \b'.repeat(`${number}... `.length));
};
const welcomeAnimation = async () => {
    const welcomeMessage = gradientColor(`
Welcome to the TypeScript Quiz App!
`);
    const startingMessage = gradientColor('Please log in to get started and track your progress...');
    await typewriterEffect(welcomeMessage, 1);
    await typewriterEffect(startingMessage, 1);
    for (let i = 3; i >= 1; i--) {
        await countdown(i);
    }
    console.log(chalk.green('GO!\n'));
};
await welcomeAnimation();
const startQuizz = async () => {
    const { startQuizAnswer } = await inquirer.prompt([
        {
            type: "list",
            name: "startQuizAnswer",
            message: "Are you ready?",
            choices: ["yes", "no"]
        }
    ]);
    return startQuizAnswer;
};
const userAnswer = await startQuizz(); // Wait for the user's answer
const userAnswerLower = userAnswer.toLowerCase(); // Convert the answer to lowercase
if (userAnswerLower === "yes") {
}
else if (userAnswerLower === "no") {
    console.log(chalk.yellow("Exiting quiz. Goodbye!"));
    process.exit(); // Exit the program
}
else {
    console.log(chalk.red("Invalid choice. Please select 'yes' or 'no'."));
    process.exit(1); // Exit the program with an error status
}
async function main() {
    const { name } = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter your name:",
        }
    ]);
    // Prompt for entering password
    const { password } = await inquirer.prompt([
        {
            type: 'password',
            name: 'password',
            message: 'Enter your password:',
            mask: '*',
            validate: (value) => {
                // Check if password meets criteria
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if (passwordRegex.test(value)) {
                    return true;
                }
                return 'Password must be at least 8 characters long with at least one uppercase letter, one lowercase letter, and one special character.';
            }
        }
    ]);
    // Prompt for confirming password
    const { confirmPassword } = await inquirer.prompt([
        {
            type: "password",
            name: "confirmPassword",
            message: "Confirm your password:",
            mask: "*",
            validate: (value) => {
                if (value === password) {
                    return true;
                }
                return "Passwords do not match.";
            }
        }
    ]);
    // Check if passwords match and meet criteria
    if (password === confirmPassword) {
        console.log(chalk.green(`Welcome, ${name}! Login successful.`));
        await chooseSubject(); // Call chooseSubject here after successful login
    }
    else {
        console.log(chalk.red("Passwords do not match. Try Again!"));
    }
}
async function chooseSubject() {
    const { subject } = await inquirer.prompt([
        {
            type: "list",
            name: "subject",
            message: "What do you want to read?",
            choices: ["Variables", "Conditions", "Operators", "Functions", "Arrays", "Objects"]
        }
    ]);
    console.log(chalk.cyan(`Great choice! Let's read some ${subject}.`));
    startQuiz(subject);
}
function Variables(subject) {
    let questions = [];
    if (subject === "Variables") {
        questions = [
            {
                question: "In JavaScript, what will be the value of x after the following code executes?\n\nvar x = 5;\nx = 10;",
                choices: ["a) 5", "b) 10", "c) undefined", "d) null"],
                answer: "b) 10"
            },
            {
                question: "Which of the following is NOT a valid variable name in most programming languages?",
                choices: ["a) myVariable", "b) 123variable", "c) _variable", "d) variable123"],
                answer: "b) 123variable"
            },
            {
                question: "What data type does the variable age represent in the following TypeScript code?\n\nlet age: number = 25;",
                choices: ["a) String", "b) Number", "c) Boolean", "d) Array"],
                answer: "b) Number"
            },
            {
                question: "In Python, how do you declare and initialize a variable name with the value \"John\"?",
                choices: ["a) name = \"John\"", "b) let name = \"John\"", "c) var name = \"John\"", "d) name := \"John\""],
                answer: "a) name = \"John\""
            },
            {
                question: "What is the scope of a variable declared using the let keyword in JavaScript?",
                choices: ["a) Global scope", "b) Local scope within the function it was declared", "c) Local scope within the block it was declared", "d) It depends on whether strict mode is enabled"],
                answer: "c) Local scope within the block it was declared"
            },
            {
                question: "Which of the following is NOT a valid way to declare a constant variable in JavaScript?",
                choices: ["a) const pi = 3.14;", "b) let pi = 3.14;", "c) var pi = 3.14;", "d) None of the above"],
                answer: "b) let pi = 3.14;"
            },
            {
                question: "In TypeScript, what will be the data type of the variable result after the following code executes?\n\nlet result = \"Hello, World!\";",
                choices: ["a) String", "b) Number", "c) Boolean", "d) Any"],
                answer: "a) String"
            },
            {
                question: "What is the value of x in JavaScript after the following code executes?\n\nvar x = 5;\nfunction test() {\n    var x = 10;\n}\ntest();\nconsole.log(x);",
                choices: ["a) 5", "b) 10", "c) undefined", "d) Error"],
                answer: "a) 5"
            },
            {
                question: "In Python, how do you swap the values of variables a and b without using a temporary variable?",
                choices: ["a) a = a + b; b = a - b; a = a - b;", "b) a = a * b; b = a / b; a = a / b;", "c) a, b = b, a", "d) b, a = a, b"],
                answer: "c) a, b = b, a"
            },
            {
                question: "Which of the following is true about variable naming conventions?",
                choices: ["a) Variable names can contain spaces.", "b) Variable names cannot start with a number.", "c) Variable names are case-insensitive."],
                answer: "b) Variable names cannot start with a number."
            }
        ];
    }
    else if (subject === "Conditions") {
        questions = [
            {
                question: "In JavaScript, what will be the result of the following expression: 10 > 5 && 20 < 25?",
                choices: ["a) true", "b) false", "c) Syntax error", "d) Runtime error"],
                answer: "a) true"
            },
            {
                question: "Which of the following is NOT a comparison operator in most programming languages?",
                choices: ["a) ==", "b) !=", "c) <=", "d) ><"],
                answer: "d) ><"
            },
            {
                question: "What is the output of the following Python code?\n\nx = 10\nif x > 5:\n    print(\"x is greater than 5\")\nelif x < 5:\n    print(\"x is less than 5\")\nelse:\n    print(\"x is equal to 5\")",
                choices: ["a) x is greater than 5", "b) x is less than 5", "c) x is equal to 5", "d) No output"],
                answer: "a) x is greater than 5"
            },
            {
                question: "In programming, what is the purpose of the \"else\" statement in an \"if...else\" construct?",
                choices: ["a) To execute a block of code if the condition is true.", "b) To execute a block of code if the condition is false.", "c) To terminate the program.", "d) To repeat the code block."],
                answer: "b) To execute a block of code if the condition is false."
            },
            {
                question: "Which of the following is true about the ternary operator in programming?",
                choices: ["a) It always requires an \"else\" clause.", "b) It can only be used for simple comparisons.", "c) It returns one of two values depending on the result of a condition.", "d) It cannot be nested."],
                answer: "c) It returns one of two values depending on the result of a condition."
            },
            {
                question: "What will the value of result be after the following TypeScript code executes?\n\nlet x = 10;\nlet result = x > 5 ? \"Greater than 5\" : \"Less than or equal to 5\";",
                choices: ["a) \"Greater than 5\"", "b) \"Less than or equal to 5\"", "c) true", "d) false"],
                answer: "a) \"Greater than 5\""
            },
            {
                question: "In Python, what is the purpose of the \"pass\" statement?",
                choices: ["a) It is used to terminate a loop.", "b) It is used to indicate that nothing should happen.", "c) It is used to skip the current iteration of a loop.", "d) It is used to signal an error."],
                answer: "b) It is used to indicate that nothing should happen."
            },
            {
                question: "Which of the following is NOT a valid logical operator in most programming languages?",
                choices: ["a) &&", "b) ||", "c) !", "d) ><"],
                answer: "d) ><"
            },
            {
                question: "What will the output of the following JavaScript code be?\n\nlet num = 7;\nlet result = num % 2 === 0 ? \"Even\" : \"Odd\";\nconsole.log(result);",
                choices: ["a) Even", "b) Odd", "c) 1", "d) 0"],
                answer: "b) Odd"
            },
            {
                question: "In a switch statement, when should the \"break\" statement be used?",
                choices: ["a) To indicate the end of the switch statement.", "b) To jump to the next case.", "c) To exit the switch statement and resume execution after the switch.", "d) It is optional and can be omitted."],
                answer: "c) To exit the switch statement and resume execution after the switch."
            }
        ];
    }
    else if (subject === "Operators") {
        questions = [
            {
                question: "Arithmetic Operators: What is the result of 12 + 5 * 2 in TypeScript?",
                choices: ["a) 34", "b) 24", "c) 22", "d) 27"],
                answer: "c) 22"
            },
            {
                question: "Assignment Operators: What does x += 3 do if x is initially 5?",
                choices: ["a) Assigns 8 to x", "b) Adds 3 to x", "c) Subtracts 3 from x", "d) Multiplies x by 3"],
                answer: "b) Adds 3 to x"
            },
            {
                question: "Logical Operators: What is the result of (10 > 5) && (7 < 3) in TypeScript?",
                choices: ["a) true", "b) false", "c) undefined", "d) Syntax Error"],
                answer: "b) false"
            },
            {
                question: "Equality Operators: What will be the result of 2 == '2' in TypeScript?",
                choices: ["a) true", "b) false", "c) Error", "d) undefined"],
                answer: "a) true"
            },
            {
                question: "Ternary Operator: What is the result of true ? 5 : 10 in TypeScript?",
                choices: ["a) 5", "b) 10", "c) true", "d) false"],
                answer: "a) 5"
            },
            {
                question: "Bitwise Operators: What is the result of 3 | 5 in TypeScript?",
                choices: ["a) 1", "b) 8", "c) 7", "d) 15"],
                answer: "c) 7"
            },
            {
                question: "Increment/Decrement Operators: What will be the value of x after let x = 5; x++ in TypeScript?",
                choices: ["a) 4", "b) 5", "c) 6", "d) 7"],
                answer: "c) 6"
            },
            {
                question: "String Concatenation Operator: What is the result of 'Hello' + 'World' in TypeScript?",
                choices: ["a) 'Hello World'", "b) 'HelloWorld'", "c) 'WorldHello'", "d) Error"],
                answer: "a) 'Hello World'"
            },
            {
                question: "Exponentiation Operator: What does 2 ** 3 evaluate to in TypeScript?",
                choices: ["a) 8", "b) 6", "c) 5", "d) 10"],
                answer: "a) 8"
            },
            {
                question: "Conditional Assignment Operator: What will be the value of y if let x = 10; let y = x ?? 5; in TypeScript?",
                choices: ["a) 10", "b) 5", "c) 0", "d) undefined"],
                answer: "a) 10"
            }
        ];
    }
    else if (subject === "Functions") {
        questions = [
            {
                question: "Function Declaration: What is the correct syntax for declaring a function named add in TypeScript that takes two parameters a and b of type number and returns their sum?",
                choices: ["a) function add(a: number, b: number): number { return a + b; }", "b) add(a: number, b: number): number => a + b;", "c) declare function add(a: number, b: number): number;", "d) add(a: number, b: number) => { return a + b; }"],
                answer: "a) function add(a: number, b: number): number { return a + b; }"
            },
            {
                question: "Function Expression: Which of the following correctly defines an anonymous function in TypeScript?",
                choices: ["a) const add = function(a: number, b: number): number { return a + b; }", "b) function add(a: number, b: number): number { return a + b; }", "c) const add(a: number, b: number): number => a + b;", "d) const add(a: number, b: number) => { return a + b; }"],
                answer: "a) const add = function(a: number, b: number): number { return a + b; }"
            },
            {
                question: "Default Parameter Values: What is the output of function greet(name: string = 'World') { console.log('Hello, ' + name); } if called without any arguments?",
                choices: ["a) Hello, undefined", "b) Hello, World", "c) Syntax Error", "d) Hello,"],
                answer: "b) Hello, World"
            },
            {
                question: "Rest Parameters: Which syntax correctly defines a function sum in TypeScript that can take a variable number of arguments and returns their sum?",
                choices: ["a) function sum(...args: number[]): number { return args.reduce((total, num) => total + num, 0); }", "b) function sum(...args): number { return args.reduce((total, num) => total + num, 0); }", "c) function sum(args: number[]): number { return args.reduce((total, num) => total + num, 0); }", "d) function sum(args): number { return args.reduce((total, num) => total + num, 0); }"],
                answer: "a) function sum(...args: number[]): number { return args.reduce((total, num) => total + num, 0); }"
            },
            {
                question: "Arrow Functions: What is the equivalent arrow function for function multiply(x: number, y: number): number { return x * y; } in TypeScript?",
                choices: ["a) const multiply = (x: number, y: number): number => x * y;", "b) const multiply(x: number, y: number): number => { return x * y; }", "c) const multiply = (x: number, y: number) => x * y;", "d) const multiply(x: number, y: number) => { return x * y; }"],
                answer: "a) const multiply = (x: number, y: number): number => x * y;"
            },
            {
                question: "Function Overloading: Which of the following demonstrates correct function overloading in TypeScript?",
                choices: ["a) function add(x: number, y: number): number; function add(x: string, y: string): string { return x + y; }", "b) function add(x: number, y: number): number { return x + y; } function add(x: string, y: string): string { return x + y; }", "c) function add(x: number, y: number): number { return x + y; } overload function add(x: string, y: string): string { return x + y; }", "d) function add(x: number, y: number): number { return x + y; } function add(x: string, y: string): string { return x + y; } overload"],
                answer: "a) function add(x: number, y: number): number; function add(x: string, y: string): string { return x + y; }"
            },
            {
                question: "Named Function Parameters: Which TypeScript feature allows calling a function with parameters specified by name rather than position?",
                choices: ["a) Optional Parameters", "b) Rest Parameters", "c) Default Parameters", "d) Object Destructuring"],
                answer: "d) Object Destructuring"
            },
            {
                question: "Function Scope: What will be logged to the console after executing the following TypeScript code?\n\nlet x = 10;\nfunction printX() {\n    console.log(x);\n    let x = 20;\n}\nprintX();",
                choices: ["a) 10", "b) 20", "c) undefined", "d) ReferenceError"],
                answer: "d) ReferenceError"
            },
            {
                question: "Higher-Order Functions: Which of the following best describes a higher-order function in TypeScript?",
                choices: ["a) A function that operates on arrays", "b) A function that returns another function or takes a function as an argument", "c) A function with multiple return statements", "d) A function that calls other functions"],
                answer: "b) A function that returns another function or takes a function as an argument"
            },
            {
                question: "Recursive Functions: Which of the following statements about recursive functions in TypeScript is true?",
                choices: ["a) Recursive functions cannot have a return type.", "b) Recursive functions always result in an infinite loop.", "c) Recursive functions call themselves within their own body.", "d) Recursive functions can only be defined using arrow function syntax."],
                answer: "c) Recursive functions call themselves within their own body."
            }
        ];
    }
    else if (subject === "Arrays") {
        questions = [
            {
                question: "Array Declaration: Which of the following syntaxes is correct for declaring an array named numbers containing numbers in TypeScript?",
                choices: ["a) let numbers: Array<number> = [1, 2, 3, 4, 5];", "b) let numbers = Array<number>(1, 2, 3, 4, 5);", "c) let numbers: number[] = [1, 2, 3, 4, 5];", "d) let numbers = number[](1, 2, 3, 4, 5);"],
                answer: "c) let numbers: number[] = [1, 2, 3, 4, 5];"
            },
            {
                question: "Accessing Array Elements: How do you access the third element of an array named arr in TypeScript?",
                choices: ["a) arr[3];", "b) arr(3);", "c) arr[2];", "d) arr.third;"],
                answer: "c) arr[2];"
            },
            {
                question: "Array Length: What is the result of arr.length if arr is an array with 5 elements?",
                choices: ["a) 5", "b) 6", "c) 4", "d) undefined"],
                answer: "a) 5"
            },
            {
                question: "Array Mutation Methods: Which array method in TypeScript adds one or more elements to the end of an array and returns the new length of the array?",
                choices: ["a) pop()", "b) push()", "c) shift()", "d) unshift()"],
                answer: "b) push()"
            },
            {
                question: "Array Iteration: What does the forEach method do when called on an array in TypeScript?",
                choices: ["a) Removes the first element from the array", "b) Adds a new element to the array", "c) Executes a provided function once for each array element", "d) Reverses the order of the array elements"],
                answer: "c) Executes a provided function once for each array element"
            },
            {
                question: "Array Filtering: Which array method in TypeScript creates a new array with all elements that pass the test implemented by the provided function?",
                choices: ["a) map()", "b) filter()", "c) reduce()", "d) slice()"],
                answer: "b) filter()"
            },
            {
                question: "Array Concatenation: What is the result of [1, 2].concat([3, 4]) in TypeScript?",
                choices: ["a) [1, 2, 3, 4]", "b) [1, 3, 2, 4]", "c) [[1, 2], [3, 4]]", "d) [1, 2, [3, 4]]"],
                answer: "a) [1, 2, 3, 4]"
            },
            {
                question: "Array Searching: Which method in TypeScript returns the index of the first occurrence of a specified value within an array, or -1 if not found?",
                choices: ["a) indexOf()", "b) includes()", "c) find()", "d) search()"],
                answer: "a) indexOf()"
            },
            {
                question: "Array Spreading: What does [...arr1, ...arr2] do in TypeScript if arr1 and arr2 are arrays?",
                choices: ["a) Merges two arrays into a single array", "b) Creates a new array containing elements from arr1 followed by elements from arr2", "c) Creates a new array with elements common to both arr1 and arr2", "d) Removes elements from arr1 that are also present in arr2"],
                answer: "b) Creates a new array containing elements from arr1 followed by elements from arr2"
            },
            {
                question: "Array Destructuring: What does [first, second, ...rest] = [1, 2, 3, 4, 5] assign to first, second, and rest in TypeScript?",
                choices: ["a) first = 1, second = 2, rest = [3, 4, 5]", "b) first = 1, second = 2, rest = [4, 5]", "c) first = 2, second = 3, rest = [1, 4, 5]", "d) first = 1, second = 3, rest = [2, 4, 5]"],
                answer: "a) first = 1, second = 2, rest = [3, 4, 5]"
            }
        ];
    }
    else if (subject === "Objects") {
        questions = [
            {
                question: "What is the syntax for defining an object literal in TypeScript?",
                choices: ["a) {}", "b) ()", "c) []", "d) <>"],
                answer: "a) {}"
            },
            {
                question: "How do you access a property name of an object person in TypeScript?",
                choices: ["a) person(name)", "b) person.name", "c) person[\"name\"]", "d) person->name"],
                answer: "b) person.name"
            },
            {
                question: "Which keyword is used to define optional properties in TypeScript interfaces?",
                choices: ["a) opt", "b) maybe", "c) optional", "d) ?"],
                answer: "d) ?"
            },
            {
                question: "What does the spread operator (...) do when used with objects in TypeScript?",
                choices: ["a) Concatenates two objects", "b) Clones an object", "c) Merges two objects", "d) Deletes properties from an object"],
                answer: "c) Merges two objects"
            },
            {
                question: "Which TypeScript feature allows you to create a type that is a combination of existing types?",
                choices: ["a) Type casting", "b) Union types", "c) Intersection types", "d) Alias types"],
                answer: "c) Intersection types"
            },
            {
                question: "How can you define a function type with an object parameter in TypeScript?",
                choices: ["a) (obj: Object) => void", "b) (obj: {}) => void", "c) (obj: any) => void", "d) (obj: {key: value}) => void"],
                answer: "b) (obj: {}) => void"
            },
            {
                question: "In TypeScript, what is the purpose of the readonly modifier when used with object properties?",
                choices: ["a) It prevents the property from being modified after initialization", "b) It makes the property accessible from outside the object", "c) It allows the property to be modified freely", "d) It ensures the property is only modified by specific methods"],
                answer: "a) It prevents the property from being modified after initialization"
            },
            {
                question: "Which TypeScript feature allows you to define an object type with specific properties and optionally additional properties?",
                choices: ["a) Interfaces", "b) Enums", "c) Classes", "d) Namespaces"],
                answer: "a) Interfaces"
            },
            {
                question: "What is the correct way to define an object type with specific properties and their types in TypeScript?",
                choices: ["a) type Person = {name: string, age: number}", "b) interface Person {name: string, age: number}", "c) class Person {name: string; age: number}", "d) enum Person {name: string, age: number}"],
                answer: "b) interface Person {name: string, age: number}"
            },
            {
                question: "Which TypeScript feature allows you to destructure an object in function parameters?",
                choices: ["a) Spread operator", "b) Rest parameters", "c) Object destructuring", "d) Default parameters"],
                answer: "c) Object destructuring"
            }
        ];
    }
    return questions;
}
async function startQuiz(subject) {
    // Retrieve the questions for the chosen subject
    const questions = Variables(subject); // Ensure this function is defined elsewhere
    let correctAnswers = 0;
    // Display quiz questions
    for (const question of questions) {
        console.log(`\nQuestion: ${chalk.yellow(question.question)}`);
        const { answer } = await inquirer.prompt([
            {
                type: "list",
                name: "answer",
                message: "Choose the correct answer:",
                choices: question.choices // Present choices without formatting to avoid comparison issues
            }
        ]);
        if (answer === question.answer) {
            console.log(chalk.green("Correct answer!"));
            correctAnswers++;
            console.log(`\nYou got ${correctAnswers} correct answers out of ${questions.length}`);
        }
        else {
            console.log(chalk.red(`Incorrect answer. Correct answer is: ${chalk.cyan(question.answer)}`));
        }
    }
    // Calculate the number of correct answers
    let totalCorrectAnswers = 0;
    for (const question of questions) {
        if (question.correctAnswer === question.userAnswer) {
            totalCorrectAnswers++;
            console.log(totalCorrectAnswers);
        }
    }
    // Calculate the number of wrong answers
    const totalWrongAnswers = questions.length - totalCorrectAnswers;
    // Calculate the percentage
    const percentage = (totalCorrectAnswers / questions.length) * 100;
    // Define grading system and message
    let grade, message;
    if (percentage >= 90) {
        grade = "A+";
        message = "Superb!";
    }
    else if (percentage >= 80) {
        grade = "A";
        message = "Excellent!";
    }
    else if (percentage >= 70) {
        grade = "B+";
        message = "Great!";
    }
    else if (percentage >= 60) {
        grade = "B";
        message = "Good!";
    }
    else if (percentage >= 50) {
        grade = "C";
        message = "Satisfactory!";
    }
    else if (percentage >= 40) {
        grade = "D";
        message = "Needs Improvement!";
    }
    else {
        grade = "F";
        message = "Fail!";
    }
    // Calculate the number of wrong answers
    console.table([
        { subject: 'Total Correct Answers', value: totalCorrectAnswers },
        { subject: 'Total Wrong Answers', value: totalWrongAnswers },
        { subject: 'Percentage', value: `${percentage.toFixed(2)}%` },
        { subject: 'Grade', value: grade },
    ]);
    // Ask if the player wants to play again
    const { playAgainOption } = await inquirer.prompt([
        {
            type: "list",
            name: "playAgainOption",
            message: "Do you want to play again?",
            choices: [chalk.green("Yes"), chalk.red("No")]
        }
    ]);
    if (playAgainOption === chalk.green("Yes")) {
        await chooseSubject();
    }
    else {
        console.log(chalk.yellow("Exiting quiz. Goodbye!"));
        process.exit(); // Exit the program
    }
}
// Start the program by calling the main function
main();
