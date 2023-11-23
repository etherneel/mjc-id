const express = require("express")
router = express.Router()
// referModel = require("../models/referralModel")
User = require("../models/wallet_address")
amountSpentFront = require("../models/spentAmount")
var purchaseHistory = require("../models/purchase_history")
var rewardsToClaim = require("../models/rewards")

// Test route 
router.get("/test-amount", async function(req, res){
    const { email } = req.body 
    amountModel = await amountSpentFront.find({user_email:email})
   
    return res.json({"response":amountModel})
})

// Purchase History  
router.post("/purchase-history", async function(req, res){
    const { user_referral_req } = req.body 
    // Get whom the user was referrd by 
    let wallet_model = await User.findOne({"address":user_referral_req})
    let transaction_referred_by = wallet_model.referedBy
    
    // Get purchase history model 
    let purchase_history_model = await purchaseHistory.find({user_referral:user_referral_req})
    
    return res.json({"purchase_history": purchase_history_model, "referedBy":transaction_referred_by})

})

// Record spent amount 
router.post("/record-spent-amount", async function(req, res){
    const { amount, user_referral_front } = req.body 
    // Verify if it's a valid user  
    user_verify = await User.findOne({referral:user_referral_front})
    // console.log(user_verify)
    if(user_verify == null){
        return res.json({"response":"Invalid User"})
    }
    
    // Record in rewards model for all 9 levels to help users claim later 
    // Get wallet address of user model 
    let user_model_reward = await User.findOne({address:user_referral_front})
    

    for(let i = 0; i < 9; i++){
        // Get the wallet address of the user who referred the above user 
     let user_to_reward_referral = user_model_reward.referedBy
    //  Check if referedBy is valid 
    let check_valid = await User.findOne({address:user_to_reward_referral})
    // Add condition for reward update, referedBy should be a valid user_model_reward.If the referral is the end of listenerCount(boundary condition), he wont be refered by anyone else, hence if loop is added 
    if(check_valid !== null){
         // get rewards model 
         let user_to_reward_model = await rewardsToClaim.findOne({user_referral:user_to_reward_referral})
     if(i == 0){
        let amount0 = amount*0.5
       
        // If entry doesnt exists, create one 
        if(user_to_reward_model == null){
            
            user_to_reward_model = await rewardsToClaim.create({user_referral:user_to_reward_referral, reward:amount0})

        }
        // Else, if the entry exists, update the reward amount
        else{
            user_to_reward_model.reward += amount0 
            user_to_reward_model.save()
        }
     }
     else if(i == 1){
        let amount1 = amount*0.2
       
        // If entry doesnt exists, create one 
        if(user_to_reward_model == null){
            
            user_to_reward_model = await rewardsToClaim.create({user_referral:user_to_reward_referral, reward:amount1})

        }
        // Else, if the entry exists, update the reward amount
        else{
            user_to_reward_model.reward += amount1 
            user_to_reward_model.save()
        }
     }
     else if(i == 2){
        let amount2 = amount*0.1
       
        // If entry doesnt exists, create one 
        if(user_to_reward_model == null){
            
            user_to_reward_model = await rewardsToClaim.create({user_referral:user_to_reward_referral, reward:amount2})

        }
        // Else, if the entry exists, update the reward amount
        else{
            user_to_reward_model.reward += amount2
            user_to_reward_model.save()
        }
     }
     else if(i == 3){
        let amount3 = amount*0.05
       
        // If entry doesnt exists, create one 
        if(user_to_reward_model == null){
            
            user_to_reward_model = await rewardsToClaim.create({user_referral:user_to_reward_referral, reward:amount3})

        }
        // Else, if the entry exists, update the reward amount
        else{
            user_to_reward_model.reward += amount3 
            user_to_reward_model.save()
        }
     }
     else if(i == 4){
        let amount4 = amount*0.05
       
        // If entry doesnt exists, create one 
        if(user_to_reward_model == null){
            
            user_to_reward_model = await rewardsToClaim.create({user_referral:user_to_reward_referral, reward:amount4})

        }
        // Else, if the entry exists, update the reward amount
        else{
            user_to_reward_model.reward += amount4
            user_to_reward_model.save()
        }
     }
     else if(i == 5){
        let amount5 = amount*0.04
       
        // If entry doesnt exists, create one 
        if(user_to_reward_model == null){
            
            user_to_reward_model = await rewardsToClaim.create({user_referral:user_to_reward_referral, reward:amount5})

        }
        // Else, if the entry exists, update the reward amount
        else{
            user_to_reward_model.reward += amount5 
            user_to_reward_model.save()
        }
     }
     else if(i == 6){
        let amount6 = amount*0.03
       
        // If entry doesnt exists, create one 
        if(user_to_reward_model == null){
            
            user_to_reward_model = await rewardsToClaim.create({user_referral:user_to_reward_referral, reward:amount6})

        }
        // Else, if the entry exists, update the reward amount
        else{
            user_to_reward_model.reward += amount6 
            user_to_reward_model.save()
        }
     }
     else if(i == 7){
        let amount7 = amount*0.02
       
        // If entry doesnt exists, create one 
        if(user_to_reward_model == null){
            
            user_to_reward_model = await rewardsToClaim.create({user_referral:user_to_reward_referral, reward:amount7})

        }
        // Else, if the entry exists, update the reward amount
        else{
            user_to_reward_model.reward += amount7
            user_to_reward_model.save()
        }
     }
     else if(i== 8){
        let amount8 = amount*0.01
       
        // If entry doesnt exists, create one 
        if(user_to_reward_model == null){
            
            user_to_reward_model = await rewardsToClaim.create({user_referral:user_to_reward_referral, reward:amount8})
            
        }
        // Else, if the entry exists, update the reward amount
        else{
            user_to_reward_model.reward += amount8 
            user_to_reward_model.save()
            console.log("test2")
        }
    }
    // else if(i == 9){

    // }
    user_model_reward = await User.findOne({address:user_to_reward_referral})
}
    }

    
    
    // record single purchase history 
    try{
    let purchase_history_model = await purchaseHistory.create({user_referral:user_referral_front, amountSpent:amount})
    purchase_history_model.save()
    
    }catch(error){
        console.log(error)
    }

    // Record spent amount 
        //  Check if an entry exists 
    amount_spent_entry = await amountSpentFront.findOne({user_referral:user_referral_front})
    // console.log(amount_spent_entry)
    if(amount_spent_entry == null){
        // Create a new entry 
        newEntry = {
            "user_referral":user_referral_front,
            "amountSpent":amount
        }
        // console.log(newEntry)
        amountSpentFront.create(newEntry).then(function(result){
            return res.json(result)
        }).catch(function(error){
            return res.json(error)
        })
    }
    else{
        amount_spent_model = await amountSpentFront.findOne({user_referral:user_referral_front})
        amount_spent_model.amountSpent += amount
        // console.log(amount_spent_model)
        amount_spent_model.save()
        return res.json({"response":"200"})
    }


    
})

router.post("/get-spent-amount", async function(req, res){
    const { user_referral_front } = req.body 
    
    // Get the amount spent model 
    let amount_spent_model = await amountSpentFront.findOne({"user_referral": user_referral_front})
    if(amount_spent_model == undefined){
        return res.json({"response": "No amount spent!"})
    }
    total_amount_spent = amount_spent_model.amountSpent 
    return res.json({"total_amount_spent":total_amount_spent})

})



router.post("/referral-info-level1", async function(req, res){
    const { main_user_referral } = req.body
    // console.log(main_user_referral)

    // Get level 1 referrals 
    let level1_referrals = await User.find({referedBy: main_user_referral})
    // console.log(level1_referrals)
   
    let level1_dict = {}
    let level1_rewards = 0
    for(i of level1_referrals){
        // Find the amount spent model corresponding to each level1 referral 
        let spent_amount_model = await amountSpentFront.findOne({user_referral:i.referral})

        
        
        // If the referral has spent money 
        if(spent_amount_model !== null){
            level1_dict[i.referral] = [spent_amount_model.amountSpent, spent_amount_model.created_at]

           
        }
        // If the referral hasn't spent money yet 
        else{
            level1_dict[i.referral] = [0, "No amount spent yet"]
           
        }
    }
    
    if((level1_dict).length !== 0){
        var count1 = 0
        for(const [referral1, amount1] of Object.entries(level1_dict)){
            count1 += amount1[0]
        }
        level1_rewards = count1*0.5
        
    }

    // Counting dictionary length 
    count_level1 = Object.keys(level1_dict).length 
    // console.log(count_level1)
    
    return res.json({"level_dict":level1_dict, "level_rewards":level1_rewards, "count_level":count_level1})

    

})

router.post("/referral-info-level2", async function(req, res){
    const { main_user_referral } = req.body 
 
    // Setting level2 rewards as 0 
    var level2_rewards = 0
    level2_dict = {}
    // Getting level1 users 
    let level1_users = await User.find({referedBy:main_user_referral})
    // console.log(level1_users)

    // Getting level 2 users 
    // Checking if there are any users in level 1 
    if(level1_users !== undefined){
        // Iterating through referrals of level1 users to find level 2 users
        for(i of level1_users){
        //   Getting level2 users referred  by each level1 user 
            level2_user = await User.find({referedBy:i.referral})
            // console.log(level2_user)
        // If level2 user list exists 
        if(level2_user !== undefined){
            // iterate over the level2 user list referrals
            for(j of level2_user){
                // check whether each referral has spent any amount 
                let spent_amount_level2 = await amountSpentFront.findOne({user_referral:j.referral})
                if(spent_amount_level2 !== null){
                    // Append to level2 dict 
                    level2_dict[j.referral] = [spent_amount_level2.amountSpent, spent_amount_level2.created_at]
                }
                else{
                    // If the level2 user hasnt spent any money yet 
                    level2_dict[j.referral] = [0, "No amount-spent entry yet"]

                }

            }
        }
        
            
        }
    }
    // Find level 2 total rewards 
    // iterate through level2 dict if it's not empty 
    // console.log(level2_dict)
    if((level2_dict).length !== 0){
        var count2 = 0 
        for(const[referral2, amount2] of Object.entries(level2_dict)){
            count2 += amount2[0]
        }
        
        level2_rewards = count2*0.2
    }
    count_level2 = Object.keys(level2_dict).length
    return res.json({"level_dict":level2_dict, "level_rewards":level2_rewards, "count_level":count_level2})
})

router.post("/referral-info-level3", async function(req, res){
    const { main_user_referral } = req.body 
    
    // setting level3 rewards to 0 
    var level3_rewards = 0 
    let level3_dict = {}

    // getting level1 users 
    let level1_users = await User.find({referedBy:main_user_referral})
   
    let level2_users = []
    // Iterating over level 1 users to get level 2 user list for each level 1 user 
    if(level1_users !== undefined){
        for(i of level1_users){
            let level2_user_list = await User.find({referedBy:i.referral})
            // if level2 user list for a given level1 user is not empty 
            if(level2_user_list !== undefined){
                // Push the level2 user referrals from the list to main level2 user list
                for(j of level2_user_list){
                   level2_users.push(j.referral)
                }
            }
        }
    }
   
    // Getting level 3 users now and creating the dict
    // Iterating over level2 list to obtain level 3 list 
    let level3_users = []
    if(level2_users.length !== 0){
     for(k of level2_users){
        let level3_user_list = await User.find({referedBy:k}) 
        if(level3_user_list !== undefined){
            for(l of level3_user_list){
                level3_users.push(l.referral)
            }
        }
     }
    }
    // Finding the amount spent by each level 3 user and returning the dict 
    // Iterating over level3 referrals 
    if(level3_users.length !== 0){
        for(const m of level3_users){
        //  Finfing if they have spent any amount 
        let spent_amount = await amountSpentFront.findOne({user_referral:m})
        // If user has spent any amount yet 
        if(spent_amount !== null){
          level3_dict[m]= [spent_amount.amountSpent, spent_amount.created_at]
        }
        // If the user hasnt spent anything yet 
        else{
            level3_dict[m] = [0, "No amount-spent entry yet"]
        }
        }
    }
    // Calculating the total level3 rewards 
    if((level3_dict).length !== 0){
        var count3 = 0
        for(const[referral3, amount3] of Object.entries(level3_dict)){
            count3 += amount3[0] 
        }
        level3_rewards = count3*0.1
    }
    count_level3 = Object.keys(level3_dict).length
    return res.json({"level_dict":level3_dict, "level_rewards":level3_rewards, "count_level":count_level3})
})

router.post("/referral-info-level4", async function(req, res){
    const { main_user_referral } = req.body 

    let level4_rewards = 0 
    let level4_dict = {}

    // Getting level 1 users 
    let level1_users4 = await User.find({referedBy:main_user_referral})

    // Iterating over level 1 users to get level 2 users 
    let level2_users = []
    if(level1_users4 !== undefined){
        for(const l of level1_users4){
        let level2_user_cursor = await User.find({referedBy:l.referral})
        if(level2_user_cursor !== undefined){
            for(const m of level2_user_cursor){
                level2_users.push(m.referral)
            }
        } 
        }
    }
    // Iterating over level2 users to get level 3 users 
    let level3_users = []
    if(level2_users.length !== 0){
        for(const n of level2_users){
            let level3_user_cursor = await User.find({referedBy:n})
            if(level3_user_cursor !== undefined){
                for(const k of level3_user_cursor){
                    level3_users.push(k.referral)
                }
            }
        }
    }

    // Iterating over level3 users to get level 4 users 
    let level4_users = []
    if(level3_users.length !== 0){
        for(const d of level3_users){
            let level4_user_cursor = await User.find({referedBy:d})
            if(level4_user_cursor !== undefined){
                for(const i of level4_user_cursor){
                    level4_users.push(i.referral)
                }
            }
        }
    }

    // Creating dict and calculating reward 
    // console.log(level4_users)
    if(level4_users.length !== 0){
        for(const j of level4_users){
            let spent_amount = await amountSpentFront.findOne({user_referral:j})
            if(spent_amount !== null){
                level4_dict[j] = [spent_amount.amountSpent, spent_amount.created_at]
            }
            else{
                level4_dict[j] = [0, "No amount-spent entry yet"]
            }
        }
    }
    var count4 = 0
    if((level4_dict).length !== 0){
        for(const[referral4, amount4] of Object.entries(level4_dict)){
            count4 += amount4[0]
        }
        level4_rewards = count4*0.05
    }
    count_level4 = Object.keys(level4_dict).length
    return res.json({"level_dict":level4_dict, "level_rewards":level4_rewards, "count_level":count_level4})

})

router.post("/referral-info-level5", async function(req, res){
    const { main_user_referral } = req.body 

    let level5_rewards = 0 
    let level5_dict = {}

    // Getting level 1 users 
    let level1_users4 = await User.find({referedBy:main_user_referral})

    // Iterating over level 1 users to get level 2 users 
    let level2_users = []
    if(level1_users4 !== undefined){
        for(const l of level1_users4){
        let level2_user_cursor = await User.find({referedBy:l.referral})
        if(level2_user_cursor !== undefined){
            for(const m of level2_user_cursor){
                level2_users.push(m.referral)
            }
        } 
        }
    }
    // Iterating over level2 users to get level 3 users 
    let level3_users = []
    if(level2_users.length !== 0){
        for(const n of level2_users){
            let level3_user_cursor = await User.find({referedBy:n})
            if(level3_user_cursor !== undefined){
                for(const k of level3_user_cursor){
                    level3_users.push(k.referral)
                }
            }
        }
    }

    // Iterating over level3 users to get level 4 users 
    let level4_users = []
    if(level3_users.length !== 0){
        for(const d of level3_users){
            let level4_user_cursor = await User.find({referedBy:d})
            if(level4_user_cursor !== undefined){
                for(const i of level4_user_cursor){
               
                    level4_users.push(i.referral)
                }
            }
        }
    }
    
    // Iterating over level4 users to get level5 users 
    let level5_users = []
    if(level4_users.length !== 0){
        for(const j of level4_users){
            let level4_user_cursor = await User.find({referedBy:j})
            if(level4_user_cursor !== undefined){
                for(const l of level4_user_cursor){
                   
                    level5_users.push(l.referral)
                }
            }
        }
    }
// Creating dict and reward 
// console.log(level5_users)
if(level5_users.length !== 0){
    for(const j of level5_users){
        let spent_amount = await amountSpentFront.findOne({user_referral:j})
        if(spent_amount !== null){
            level5_dict[j] = [spent_amount.amountSpent, spent_amount.created_at]
        }
        else{
            level5_dict[j] = [0, "No amount-spent entry yet"]
        }
    }
}
var count5 = 0
if((level5_dict).length !== 0){
    for(const[referral5, amount5] of Object.entries(level5_dict)){
        count5 += amount5[0]
    }
    level5_rewards = count5*0.05
}
count_level5 = Object.keys(level5_dict).length
return res.json({"level_dict":level5_dict, "level_rewards":level5_rewards, "count_level":count_level5})
    

})

router.post("/referral-info-level6", async function(req, res){
    const { main_user_referral } = req.body 

    let level6_rewards = 0 
    let level6_dict = {}

    // Getting level 1 users 
    let level1_users4 = await User.find({referedBy:main_user_referral})

    // Iterating over level 1 users to get level 2 users 
    let level2_users = []
    if(level1_users4 !== undefined){
        for(const l of level1_users4){
        let level2_user_cursor = await User.find({referedBy:l.referral})
        if(level2_user_cursor !== undefined){
            for(const m of level2_user_cursor){
                level2_users.push(m.referral)
            }
        } 
        }
    }
    // Iterating over level2 users to get level 3 users 
    let level3_users = []
    if(level2_users.length !== 0){
        for(const n of level2_users){
            let level3_user_cursor = await User.find({referedBy:n})
            if(level3_user_cursor !== undefined){
                for(const k of level3_user_cursor){
                    level3_users.push(k.referral)
                }
            }
        }
    }

    // Iterating over level3 users to get level 4 users 
    let level4_users = []
    if(level3_users.length !== 0){
        for(const d of level3_users){
            let level4_user_cursor = await User.find({referedBy:d})
            if(level4_user_cursor !== undefined){
                for(const i of level4_user_cursor){
               
                    level4_users.push(i.referral)
                }
            }
        }
    }
    
    // Iterating over level4 users to get level5 users 
    let level5_users = []
    if(level4_users.length !== 0){
        for(const j of level4_users){
            let level5_user_cursor = await User.find({referedBy:j})
            if(level5_user_cursor !== undefined){
                for(const l of level5_user_cursor){
                   
                    level5_users.push(l.referral)
                }
            }
        }
    }
    // Iterating over level 5 to get level 6 users 
    let level6_users = []
    if(level5_users.length !== 0){
        for(const j of level5_users){
            let level6_user_cursor = await User.find({referedBy:j})
            if(level6_user_cursor !== undefined){
                for(const l of level6_user_cursor){
                   
                    level6_users.push(l.referral)
                }
            }
        }
    }
    // Creating dict and reward 
// console.log(level5_users)
if(level6_users.length !== 0){
    for(const j of level6_users){
        let spent_amount = await amountSpentFront.findOne({user_referral:j})
        if(spent_amount !== null){
            level6_dict[j] = [spent_amount.amountSpent, spent_amount.created_at]
        }
        else{
            level6_dict[j] = [0, "No amount-spent entry yet"]
        }
    }
}
var count6 = 0
if((level6_dict).length !== 0){
    for(const[referral6, amount6] of Object.entries(level6_dict)){
        count6 += amount6[0]
    }
    level6_rewards = count6*0.04
}
count_level6 = Object.keys(level6_dict).length
return res.json({"level_dict":level6_dict, "level_rewards":level6_rewards, "count_level":count_level6})
    
    
})
router.post("/referral-info-level7", async function(req, res){
    const { main_user_referral } = req.body 

    let level7_rewards = 0 
    let level7_dict = {}

    // Getting level 1 users 
    let level1_users4 = await User.find({referedBy:main_user_referral})

    // Iterating over level 1 users to get level 2 users 
    let level2_users = []
    if(level1_users4 !== undefined){
        for(const l of level1_users4){
        let level2_user_cursor = await User.find({referedBy:l.referral})
        if(level2_user_cursor !== undefined){
            for(const m of level2_user_cursor){
                level2_users.push(m.referral)
            }
        } 
        }
    }
    // Iterating over level2 users to get level 3 users 
    let level3_users = []
    if(level2_users.length !== 0){
        for(const n of level2_users){
            let level3_user_cursor = await User.find({referedBy:n})
            if(level3_user_cursor !== undefined){
                for(const k of level3_user_cursor){
                    level3_users.push(k.referral)
                }
            }
        }
    }

    // Iterating over level3 users to get level 4 users 
    let level4_users = []
    if(level3_users.length !== 0){
        for(const d of level3_users){
            let level4_user_cursor = await User.find({referedBy:d})
            if(level4_user_cursor !== undefined){
                for(const i of level4_user_cursor){
               
                    level4_users.push(i.referral)
                }
            }
        }
    }
    
    // Iterating over level4 users to get level5 users 
    let level5_users = []
    if(level4_users.length !== 0){
        for(const j of level4_users){
            let level5_user_cursor = await User.find({referedBy:j})
            if(level5_user_cursor !== undefined){
                for(const l of level5_user_cursor){
                   
                    level5_users.push(l.referral)
                }
            }
        }
    }
    // Iterating over level 5 to get level 6 users 
    let level6_users = []
    if(level5_users.length !== 0){
        for(const j of level5_users){
            let level6_user_cursor = await User.find({referedBy:j})
            if(level6_user_cursor !== undefined){
                for(const l of level6_user_cursor){
                   
                    level6_users.push(l.referral)
                }
            }
        }
    }
    // Iterating over level 6 to get level 7 users 
    let level7_users = []
    if(level6_users.length !== 0){
        for(const j of level6_users){
            let level7_user_cursor = await User.find({referedBy:j})
            if(level7_user_cursor !== undefined){
                for(const l of level7_user_cursor){
                   
                    level7_users.push(l.referral)
                }
            }
        }
    }
    // Creating dict and reward 
// console.log(level5_users)
if(level7_users.length !== 0){
    for(const j of level7_users){
        let spent_amount = await amountSpentFront.findOne({user_referral:j})
        if(spent_amount !== null){
            level7_dict[j] = [spent_amount.amountSpent, spent_amount.created_at]
        }
        else{
            level7_dict[j] = [0, "No amount-spent entry yet"]
        }
    }
}
var count7 = 0
if((level7_dict).length !== 0){
    for(const[referral7, amount7] of Object.entries(level7_dict)){
        count7 += amount7[0]
    }
    level7_rewards = count7*0.03
}
count_level7 = Object.keys(level7_dict).length
return res.json({"level_dict":level7_dict, "level_rewards":level7_rewards, "count_level":count_level7 })
    
    
})
router.post("/referral-info-level8", async function(req, res){
    const { main_user_referral } = req.body 

    let level8_rewards = 0 
    let level8_dict = {}

    // Getting level 1 users 
    let level1_users4 = await User.find({referedBy:main_user_referral})

    // Iterating over level 1 users to get level 2 users 
    let level2_users = []
    if(level1_users4 !== undefined){
        for(const l of level1_users4){
        let level2_user_cursor = await User.find({referedBy:l.referral})
        if(level2_user_cursor !== undefined){
            for(const m of level2_user_cursor){
                level2_users.push(m.referral)
            }
        } 
        }
    }
    // Iterating over level2 users to get level 3 users 
    let level3_users = []
    if(level2_users.length !== 0){
        for(const n of level2_users){
            let level3_user_cursor = await User.find({referedBy:n})
            if(level3_user_cursor !== undefined){
                for(const k of level3_user_cursor){
                    level3_users.push(k.referral)
                }
            }
        }
    }

    // Iterating over level3 users to get level 4 users 
    let level4_users = []
    if(level3_users.length !== 0){
        for(const d of level3_users){
            let level4_user_cursor = await User.find({referedBy:d})
            if(level4_user_cursor !== undefined){
                for(const i of level4_user_cursor){
               
                    level4_users.push(i.referral)
                }
            }
        }
    }
    
    // Iterating over level4 users to get level5 users 
    let level5_users = []
    if(level4_users.length !== 0){
        for(const j of level4_users){
            let level5_user_cursor = await User.find({referedBy:j})
            if(level5_user_cursor !== undefined){
                for(const l of level5_user_cursor){
                   
                    level5_users.push(l.referral)
                }
            }
        }
    }
    // Iterating over level 5 to get level 6 users 
    let level6_users = []
    if(level5_users.length !== 0){
        for(const j of level5_users){
            let level6_user_cursor = await User.find({referedBy:j})
            if(level6_user_cursor !== undefined){
                for(const l of level6_user_cursor){
                   
                    level6_users.push(l.referral)
                }
            }
        }
    }
    // Iterating over level 6 to get level 7 users 
    let level7_users = []
    if(level6_users.length !== 0){
        for(const j of level6_users){
            let level7_user_cursor = await User.find({referedBy:j})
            if(level7_user_cursor !== undefined){
                for(const l of level7_user_cursor){
                   
                    level7_users.push(l.referral)
                }
            }
        }
    }
    // Iterating over level 7 to get level 8 users 
    let level8_users = []
    if(level7_users.length !== 0){
        for(const j of level7_users){
            let level8_user_cursor = await User.find({referedBy:j})
            if(level8_user_cursor !== undefined){
                for(const l of level8_user_cursor){
                   
                    level8_users.push(l.referral)
                }
            }
        }
    }
    // Creating dict and reward 

if(level8_users.length !== 0){
    for(const j of level8_users){
        let spent_amount = await amountSpentFront.findOne({user_referral:j})
        if(spent_amount !== null){
            level8_dict[j] = [spent_amount.amountSpent, spent_amount.created_at]
        }
        else{
            level8_dict[j] = [0, "No amount-spent entry yet"]
        }
    }
}
var count8 = 0
if((level8_dict).length !== 0){
    for(const[referral8, amount8] of Object.entries(level8_dict)){
        count8 += amount8[0]
    }
    level8_rewards = count8*0.02
}
count_level8 = Object.keys(level8_dict).length
return res.json({"level_dict":level8_dict, "level_rewards":level8_rewards, "count_level":count_level8})
    
    
})
router.post("/referral-info-level9", async function(req, res){
    const { main_user_referral } = req.body 

    let level9_rewards = 0 
    let level9_dict = {}

    // Getting level 1 users 
    let level1_users4 = await User.find({referedBy:main_user_referral})

    // Iterating over level 1 users to get level 2 users 
    let level2_users = []
    if(level1_users4 !== undefined){
        for(const l of level1_users4){
        let level2_user_cursor = await User.find({referedBy:l.referral})
        if(level2_user_cursor !== undefined){
            for(const m of level2_user_cursor){
                level2_users.push(m.referral)
            }
        } 
        }
    }
    // Iterating over level2 users to get level 3 users 
    let level3_users = []
    if(level2_users.length !== 0){
        for(const n of level2_users){
            let level3_user_cursor = await User.find({referedBy:n})
            if(level3_user_cursor !== undefined){
                for(const k of level3_user_cursor){
                    level3_users.push(k.referral)
                }
            }
        }
    }

    // Iterating over level3 users to get level 4 users 
    let level4_users = []
    if(level3_users.length !== 0){
        for(const d of level3_users){
            let level4_user_cursor = await User.find({referedBy:d})
            if(level4_user_cursor !== undefined){
                for(const i of level4_user_cursor){
               
                    level4_users.push(i.referral)
                }
            }
        }
    }
    
    // Iterating over level4 users to get level5 users 
    let level5_users = []
    if(level4_users.length !== 0){
        for(const j of level4_users){
            let level5_user_cursor = await User.find({referedBy:j})
            if(level5_user_cursor !== undefined){
                for(const l of level5_user_cursor){
                   
                    level5_users.push(l.referral)
                }
            }
        }
    }
    // Iterating over level 5 to get level 6 users 
    let level6_users = []
    if(level5_users.length !== 0){
        for(const j of level5_users){
            let level6_user_cursor = await User.find({referedBy:j})
            if(level6_user_cursor !== undefined){
                for(const l of level6_user_cursor){
                   
                    level6_users.push(l.referral)
                }
            }
        }
    }
    // Iterating over level 6 to get level 7 users 
    let level7_users = []
    if(level6_users.length !== 0){
        for(const j of level6_users){
            let level7_user_cursor = await User.find({referedBy:j})
            if(level7_user_cursor !== undefined){
                for(const l of level7_user_cursor){
                   
                    level7_users.push(l.referral)
                }
            }
        }
    }
    // Iterating over level 7 to get level 8 users 
    let level8_users = []
    if(level7_users.length !== 0){
        for(const j of level7_users){
            let level8_user_cursor = await User.find({referedBy:j})
            if(level8_user_cursor !== undefined){
                for(const l of level8_user_cursor){
                   
                    level8_users.push(l.referral)
                }
            }
        }
    }
    // Iterating over level 8 to get level 9 users 
    let level9_users = []
    if(level8_users.length !== 0){
        for(const j of level8_users){
            let level9_user_cursor = await User.find({referedBy:j})
            if(level9_user_cursor !== undefined){
                for(const l of level9_user_cursor){
                   
                    level9_users.push(l.referral)
                }
            }
        }
    }
    // Creating dict and reward 

if(level9_users.length !== 0){
    for(const j of level9_users){
        let spent_amount = await amountSpentFront.findOne({user_referral:j})
        if(spent_amount !== null){
            level9_dict[j] = [spent_amount.amountSpent, spent_amount.created_at]
        }
        else{
            level9_dict[j] = [0, "No amount-spent entry yet"]
        }
    }
}
var count9 = 0
if((level9_dict).length !== 0){
    for(const[referral9, amount9] of Object.entries(level9_dict)){
        count9 += amount9[0]
    }
    level9_rewards = count9*0.01
}
count_level9 = Object.keys(level9_dict).length
return res.json({"level_dict":level9_dict, "level_rewards":level9_rewards, "count_level":count_level9})
    
    
})

router.post("/address-by-userid", async function(req, res){
    const {user_id_front} = req.body 

    let wallet_model = await User.findOne({user_id:user_id_front})
    // console.log(wallet_model)
    if(wallet_model !== null){
         address_value = wallet_model.address
    }
    
    return res.json({"address":address_value})
})

router.post("/claim-rewards", async function(req,res){
    const { reward_referral } = req.body 

    let reward_model = await rewardsToClaim.findOne({user_referral:reward_referral})
    if(reward_model !== null){
        if(reward_model.reward !== 0){
        let response_reward = reward_model.reward
        reward_model.reward = 0 
        reward_model.save()
        return res.json({"response":`Reward of $ ${response_reward} claimed successfully!`})
        }
        else{
            return res.json({"response":"No rewards available to claim!"})
        }
    }
    else{
        return res.json({"response":"No rewards available to claim!"})
    }

})

router.post("/available-rewards", async function(req, res){
    const {available_reward_referral} = req.body 

    let reward_model = await rewardsToClaim.findOne({user_referral:available_reward_referral})
    if(reward_model !== null){
        if(reward_model.reward !== 0){
            return res.json({"available_rewards":reward_model.reward})
        }
        else{
            return res.json({"available_rewards":0})
        }
    }
    else{
        return res.json({"available_rewards":0})
    }
})


module.exports = router