import {connectToDB} from "@/dbConfig/dbConfig";
import ApplicationModel from "@/models/application.model";
import { NextRequest, NextResponse } from "next/server";






export async function POST(request: NextRequest){
    connectToDB();
    try {
        const reqBody = await request.json()
        const {applicationName,applicationDescription, admins,ETE1,ETE2} = reqBody

        console.log(reqBody);

        //check if app already exists
        const app = await ApplicationModel.findOne({applicationName})

        if(app){
            return NextResponse.json({error: "App already exists"}, {status: 400})
        }

        

        const newApplication = new ApplicationModel({
            applicationName,
            applicationDescription,
            admins,
            ETE1,
            ETE2
           
        })

        const saveApplication = await newApplication.save()
        console.log(saveApplication);

       
        return NextResponse.json({
            message: "Application created successfully",
            success: true,
            saveApplication
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}