// 9 levels 
router.post("/get-referral-info", async function(req, res){
    const {main_user_email} = req.body 
    
    // Getting level 1 emails 
    // Getting user referral id 
    const main_user_model=  await User.findOne({email:main_user_email})
    const main_user_referral = main_user_model.referral
    // Getting level1 models where referredBy is main_user_referral 
    level1_emails = []
    level1_spent_amounts = {}
    level1_total_rewards = 0
    level1_email_models = await User.find({referedBy:main_user_referral}) 
    if(level1_email_models.length !== 0)
    {for(i of level1_email_models){
        level1_emails.push(i.email)
        let level1_spent_amount = await amountSpentFront.findOne({user_email:i.email})
        if(level1_spent_amount !== null){
        level1_spent_amounts[i.email] = level1_spent_amount.amountSpent
        }
    }}
// Calculating level 1 rewards 
var count1 = 0
if((level1_spent_amounts).length !== 0){
    for(const [email1, spentAmount1] of Object.entries(level1_spent_amounts)){
        count1 += spentAmount1
    }
    level1_total_rewards = count1*0.5
}
    

    // Getting level2 emails
    level1_referral_id = []
    level2_emails = []
    level2_spent_amounts = {}
    level2_total_rewards = []
    if(level1_email_models.length !== 0)
    {for(email_models of level1_email_models){
        level1_referral_id.push(email_models.referral)
    }}
    // Getting models where referredBy is level1_referral_id elements 
    if(level1_referral_id.length !== 0)
    {for(i of level1_referral_id){
        let level2_user_models = await User.find({referedBy:i})
        
        if(level2_user_models.length !==  0){
        for(j of level2_user_models){
            level2_emails.push(j.email)
            let level2_spent_amount = await amountSpentFront.findOne({user_email:j.email})
            if(level2_spent_amount !== null){
                level2_spent_amounts[j.email] = level2_spent_amount.amountSpent
            }
        }
    } }  
    }
    // TEST 
    var count2 = 0 
    if((level2_spent_amounts).length !== 0){
    for(const [email2, spentAmout2] of Object.entries(level2_spent_amounts)){
        count2 += spentAmout2 
    }
    level2_total_rewards = count2*0.2
}
    
//    Getting level3 emails 
    // Getting level 2 referral ids 
    level2_referral_id = []
    level3_emails = []
    level3_spent_amounts = {}
    level3_total_rewards = 0
    if(level2_emails.length !== 0){
        for(i of level2_emails){
            let ref_model = await User.findOne({email:i})
            if(ref_model !== null){
            level2_referral_id.push(ref_model.referral)
            }
        }
    }
    // console.log("level2 referral", level2_referral_id)
    if(level2_referral_id.length !== 0){
        for(i of level2_referral_id){
            let level3_models = await User.findOne({referedBy:i})
            // console.log("level 3", level3_models)
            if(level3_models !== null){
            level3_emails.push(level3_models.email)
            let level3_spent_amount = await amountSpentFront.findOne({user_email:level3_models.email})
            if(level3_spent_amount !== null){
                level3_spent_amounts[level3_models.email] = level3_spent_amount.amountSpent
            }
            }
        }
    }
    var count3 = 0
    if((level3_spent_amounts).length !== 0){
        for(const[email3, spentAmount3] of  Object.entries(level3_spent_amounts)){
            count3 += spentAmount3
        }
        level3_total_rewards = count3*0.1
    }
//    Getting level4 emails 
    // Getting level 3 referral ids 
    level3_referral_id = []
    level4_emails = []
    level4_spent_amounts = {}
    level4_total_rewards = 0
    // console.log(level3_emails.length, level3_emails)
    if(level3_emails.length !== 0){
        for(i of level3_emails){
            let ref_model = await User.findOne({email:i})
            if(ref_model !== null){
            level3_referral_id.push(ref_model.referral)
            }
        }
    }
    if(level3_referral_id.length !== 0){
        for(i of level3_referral_id){
            let level4_models = await User.findOne({referedBy:i})
            if(level4_models !== null){
            level4_emails.push(level4_models.email)
            let level4_spent_amount = await amountSpentFront.findOne({user_email:level4_models.email})
            if(level4_spent_amount !== null){
                level4_spent_amounts[level4_models.email] = level4_spent_amount.amountSpent
            }
            }
        }
    }
    var count4 = 0 
    if((level4_spent_amounts).length !== 0){
        for(const[email4, spentAmount4] of Object.entries(level4_spent_amounts)){
            count4 += spentAmount4
        }
        level4_total_rewards = count4 *0.05
    }
//    Getting level5 emails 
    // Getting level 4 referral ids 
    level4_referral_id = []
    level5_emails = []
    level5_spent_amounts = {}
    level5_total_rewards = 0
    // console.log(level3_emails.length, level3_emails)
    if(level4_emails.length !== 0){
        for(i of level4_emails){
            let ref_model = await User.findOne({email:i})
            if(ref_model !== null){
            level4_referral_id.push(ref_model.referral)
            }
        }
    }
    // Getting level5 emails 
    if(level4_referral_id.length !== 0){
        for(i of level4_referral_id){
            let level5_models = await User.findOne({referedBy:i})
            if(level5_models !== null){
            level5_emails.push(level5_models.email)
            let level5_spent_amount = await amountSpentFront.findOne({user_email:level5_models.email})
            if(level5_spent_amount !== null){
                level5_spent_amounts[level5_models.email] = level5_spent_amount.amountSpent
            }
            }
        }
    }
    var count5 = 0
    if((level5_spent_amounts).length !== 0){
        // console.log(level5_spent_amounts)
        for([email5, spentAmount5] of Object.entries(level5_spent_amounts)){
            count5 += spentAmount5
            // console.log(typeof(spentAmount5))
        }
        // console.log(count5)
        level5_total_rewards = count5*0.05
    }
//    Getting level6 emails 
    // Getting level 5 referral ids 
    level5_referral_id = []
    level6_emails = []
    level6_spent_amounts = {}
    level6_total_rewards = 0
    // console.log(level3_emails.length, level3_emails)
    if(level5_emails.length !== 0){
        for(i of level5_emails){
            let ref_model = await User.findOne({email:i})
            if(ref_model !== null){
            level5_referral_id.push(ref_model.referral)
            }
        }
    }
    // Getting level6 emails 
    if(level5_referral_id.length !== 0){
        for(i of level5_referral_id){
            let level6_models = await User.findOne({referedBy:i})
            if(level6_models !== null){
            level6_emails.push(level6_models.email)
            let level6_spent_amount = await amountSpentFront.findOne({user_email:level6_models.email})
            if(level6_spent_amount !== null){
                level6_spent_amounts[level6_models.email] = level6_spent_amount.amountSpent
            }
            }
        }
    }
    var count6 = 0 
    if((level6_spent_amounts).length !== 0){
        for(const[email6, spentAmount6] of Object.entries(level6_spent_amounts)){
            count6 += spentAmount6
        }
        level6_total_rewards = count6*0.04
    }
//    Getting level7 emails 
    // Getting level 6 referral ids 
    level6_referral_id = []
    level7_emails = []
    level7_spent_amounts = {}
    level7_total_rewards = 0
    // console.log(level3_emails.length, level3_emails)
    if(level6_emails.length !== 0){
        for(i of level6_emails){
            let ref_model = await User.findOne({email:i})
            if(ref_model !== null){
            level6_referral_id.push(ref_model.referral)
            }
        }
    }
    // Getting level7 emails 
    if(level6_referral_id.length !== 0){
        for(i of level6_referral_id){
            let level7_models = await User.findOne({referedBy:i})
            if(level7_models !== null){
            level7_emails.push(level7_models.email)
            let level7_spent_amount = await amountSpentFront.findOne({user_email:level7_models.email})
            if(level7_spent_amount !== null){
                level7_spent_amounts[level7_models.email] = level7_spent_amount.amountSpent
            }
            }
        }
    }
    var count7 = 0
    if((level7_spent_amounts).length != 0){
        for(const[email7, spentAmount7] of Object.entries(level7_spent_amounts)){
            count7 += spentAmount7
        }
        level7_total_rewards = count7*0.03
    }
//    Getting level8 emails 
    // Getting level 7 referral ids 
    level7_referral_id = []
    level8_emails = []
    level8_spent_amounts = {}
    level8_total_rewards = 0
    // console.log(level3_emails.length, level3_emails)
    if(level7_emails.length !== 0){
        for(i of level7_emails){
            let ref_model = await User.findOne({email:i})
            if(ref_model !== null){
            level7_referral_id.push(ref_model.referral)
            }
        }
    }
    // Getting level8 emails 
    if(level7_referral_id.length !== 0){
        for(i of level7_referral_id){
            let level8_models = await User.findOne({referedBy:i})
            if(level8_models !== null){
            level8_emails.push(level8_models.email)
            let level8_spent_amount = await amountSpentFront.findOne({user_email:level8_models.email})
            if(level8_spent_amount !== null){
                level8_spent_amounts[level8_models.email] = level8_spent_amount.amountSpent
            }
            }
        }
    }
    var count8 = 0
    if((level8_spent_amounts).length != 0){
        for(const[email8, spentAmount8] of Object.entries(level8_spent_amounts)){
            count8 += spentAmount8
        }
        level8_total_rewards = count8*0.02
    }
//    Getting level9 emails 
    // Getting level 8 referral ids 
    level8_referral_id = []
    level9_emails = []
    level9_spent_amounts = {}
    level9_total_rewards = 0
    // console.log(level3_emails.length, level3_emails)
    if(level8_emails.length !== 0){
        for(i of level8_emails){
            let ref_model = await User.findOne({email:i})
            if(ref_model !== null){
            level8_referral_id.push(ref_model.referral)
            }
        }
    }
    // Getting level9 emails 
    if(level8_referral_id.length !== 0){
        for(i of level8_referral_id){
            let level9_models = await User.findOne({referedBy:i})
            if(level9_models !== null){
            level9_emails.push(level9_models.email)
            let level9_spent_amount = await amountSpentFront.findOne({user_email:level9_emails})
            if(level9_spent_amount !== null){
                level9_spent_amounts[level9_models.email] = level9_spent_amount.amountSpent
            }
            }
        }
    }
    var count9 = 0
    if((level9_spent_amounts).length != 0){
        for(const[email9, spentAmount9] of Object.entries(level9_spent_amounts)){
            count9 += spentAmount9
        }
        level9_total_rewards = count9*0.01
    }

     

  
    return res.json({"level1_emails":level1_emails, "level1_spent_dict":level1_spent_amounts,"level1_rewards":level1_total_rewards ,"level2_spent_dict":level2_spent_amounts, "level2":level2_emails,"level2_rewards":level2_total_rewards ,"level3_spent_dict":level3_spent_amounts ,"level3":level3_emails,"level3_rewards":level3_total_rewards ,"level4_spent_dict":level4_spent_amounts ,"level4":level4_emails,"level4_rewards":level4_total_rewards,"level5_spent_dict":level5_spent_amounts,"level5":level5_emails,"level5_rewards":level5_total_rewards ,"level6_spent_dict":level6_spent_amounts ,"level6":level6_emails,"level6_rewards":level6_total_rewards ,"level7_spent_dict":level7_spent_amounts ,"level7":level7_emails,"level7_rewards":level7_total_rewards ,"level8_spent_dict":level8_spent_amounts ,"level8":level8_emails,"level8_rewards":level8_total_rewards ,"level9_spent_dict":level9_spent_amounts ,"level9":level9_emails, "level9_rewards":level9_total_rewards})
    // level1 = await userModel.find()
})