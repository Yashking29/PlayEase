import express from 'express';
import {get_result} from './controllers/Multiplier.js';
import { generateRandomHash } from './controllers/HashGenerator.js';

const router=express.Router();

// My version
// router.get('/',(req,res)=>{       

//       function generateNumber() {
//             // Generate a random number between 0 and 1
//             const randomNumber = Math.random();
//             console.log(randomNumber);
            
//             // Calculate the probability for each number
//             // The probability of getting a number is 1/number
//             let cumulativeProbability = 0;
//             let generatedNumber = 0;
//             for (let i = 2; i <= 100; i++) {
//                 cumulativeProbability += 1/i;
//                 if (randomNumber <= cumulativeProbability) {
//                     generatedNumber = i;
//                     break;
//                 }
//             }
            
//             return generatedNumber;
//         }
          
//           // Example usage
//           const randomValue = generateNumber();
//           console.log(randomValue);

//       res.json({data:randomValue});

// })


// Not my version Aksaht Version
router.get('/',(req,res)=>{
    const result = get_result(generateRandomHash());
    console.log(result);
    res.json({data:result});
})

export {router};