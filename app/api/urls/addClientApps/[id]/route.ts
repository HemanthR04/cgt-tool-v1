import { connectToDB } from "@/dbConfig/dbConfig";
import ApplicationModel from "@/models/application.model";
import URLS from "@/models/url.model";
import { NextRequest, NextResponse } from "next/server";

interface ErrorResponse {
  error: string;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
console.log(id)
  try {
    connectToDB();
    
    const url = await URLS.findOne({ _id: id });
    console.log(url)
    if (!url) {
      const errorResponse: ErrorResponse = { error: "URL not found" };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    const reqBody = await request.json();
    const { clientApps } = reqBody;

   console.log("clientApps clientAppName ===="+clientApps.clientAppName);
   console.log("clientApps clientAppURL ===="+clientApps.clientAppURL);

  
    const updatedURL = await URLS.findByIdAndUpdate(
      id,
      { clientApps },
      { new: true }
    );

    return NextResponse.json({
      message: "URL updated successfully",
      success: true,
      updatedURL,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
