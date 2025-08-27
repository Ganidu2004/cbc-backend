import user from "../models/users.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


// create new use code
export function createUser(req,res){

    const newUserData = req.body

    // password hashing code by bcrypt
    newUserData.password = bcrypt.hashSync(newUserData.password,10)

    const newUser = new user(newUserData)

    newUser.save().then(()=>{
        res.json({
            message : "user created"
        })
    }).catch(()=>{
        res.json({
            message : "user not created"
        })
    })
}

// login user code
export function loginUser(req,res){

    // find out from the database which email the user is using
    user.find({email : req.body.email}).then(
        // pass the new parameter store the email in users
        (users)=>{
            if(users.length == 0){
                res.json({
                    message : "User not found" 
                })
            }else{
                const user = users[0]

                // compare  password and user rwq password from database
                const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)

                if(isPasswordCorrect){
                        // create the json web token
                        const token = jwt.sign({
                            email : user.email,
                            firstName : user.firstName,
                            lastName : user.lastName,
                            isBlocked : user.isBlocked,
                            type : user.type,
                            profilePic : user.profilePic
                        } , "hgck16589" ) //secret key

                        res.json({
                            message : "User logged in",
                            token : token
                        })
                        
                }else{
                    res.json({
                        message : "User not logged in (wrong password)"
                    })
                }
            }
        }
    )
}