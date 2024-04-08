1
2
3
4
5
6
7
8
9
10
11
12
13
14
// Ask the user to enter an integer value
var userInput = prompt("Enter an integer value:");
// Convert the user input to an integer
var intValue = parseInt(userInput);
// Check if the input is a valid integer
if (!isNaN(intValue)) {
    // Print the integer value
    console.log("You entered: " + intValue);
} else {
    console.log("Invalid input. Please enter a valid integer value.");
}