import {connectToDB} from "@/dbConfig/dbConfig";
import ApplicationModel from "@/models/application.model";
import { NextRequest, NextResponse } from "next/server";



connectToDB()


export async function PATCH(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {applicationId,secondaryAdmin} = reqBody

        console.log(reqBody);

        const { searchParams } = new URL(request.url);
        const appId = searchParams.get("appId");

        //check if admin already exists
        const user = await ApplicationModel.findOne({secondaryAdmin})

        if(user){
            return NextResponse.json({error: "Admin already exists"}, {status: 400})
        }

        if (!appId) {
            return new NextResponse(
              JSON.stringify({ message: "Invalid or missing applicationId" }),
              { status: 400 }
            );
          }
      
          if (!secondaryAdmin) {
            return new NextResponse(
              JSON.stringify({ message: "Invalid or missing admin Name" }),
              { status: 400 }
            );
          }

          const app = await ApplicationModel.findOne({ _id: applicationId});
    if (!app) {
      return new NextResponse(
        JSON.stringify({
          message: "App not found ",
        }),
        {
          status: 404,
        }
      );
    }
    const updatedApp = await ApplicationModel.findByIdAndUpdate(
        applicationId,
        { secondaryAdmin},
        { new: true }
      );
  
        return NextResponse.json({
            message: "Application updated successfully",
            success: true,
            updatedApp
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}