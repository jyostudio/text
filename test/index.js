import * as E from "../src/index.js";

// Create a UTF-8 encoding.
const utf8 =  E.Encoding.utf8;

// A Unicode string with two characters outside an 8-bit code range.
let unicodeString =
    "你好吗😊This Unicode string has 2 characters outside the " +
    "ASCII range:\r\n\n" +
    "Pi (\u03a0), and Sigma (\u03a3).";
console.dir("Original string:");
console.log(unicodeString);

// Encode the string.
let encodedBytes = utf8.getBytes(unicodeString);
// Decode bytes back to string.
let decodedString = utf8.getString(encodedBytes);
console.dir("Decoded bytes:");
console.log(decodedString);

console.dir(E.Encoding.utf8.getDecoder());