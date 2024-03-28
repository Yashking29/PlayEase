import express from 'express';

const router=express.Router();


router.get('/',(req,res)=>{

      function generateNumber() {
            // Generate a random number between 0 and 1
            const randomNumber = Math.random();
            console.log(randomNumber);
            
            // Calculate the probability for each number
            // The probability of getting a number is 1/number
            let cumulativeProbability = 0;
            let generatedNumber = 0;
            for (let i = 2; i <= 100; i++) {
                cumulativeProbability += 1/i;
                if (randomNumber <= cumulativeProbability) {
                    generatedNumber = i;
                    break;
                }
            }
            
            return generatedNumber;
        }
          
          // Example usage
          const randomValue = generateNumber();
          console.log(randomValue);

      res.json({data:randomValue});

})

export {router};