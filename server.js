const express = require('express');
const app = express();

function factorial(n){
    if(n==0 || n==1) return 1;
    return n*factorial(n-1);
}

app.get('/',(req,res)=>{
    res.send("Factorial of 5 is " + factorial(5));
});

app.listen(3000,()=>{
    console.log("Running on port 3000");
});