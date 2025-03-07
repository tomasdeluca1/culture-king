import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("suggestions");

    const suggestions = await collection
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "sub",
            as: "user",
          },
        },
        {
          $unwind: {
            path: "$user",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { votes: -1, createdAt: -1 },
        },
        {
          $project: {
            _id: 1,
            text: 1,
            votes: 1,
            voters: 1,
            createdAt: 1,
            author: "$name",
            picture: "$picture",
          },
        },
      ])
      .toArray();

    return NextResponse.json(suggestions);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return new NextResponse(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse(null, { status: 401 });
    }

    const { text } = await req.json();
    if (!text?.trim()) {
      return new NextResponse(null, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("suggestions");

    const suggestion = {
      text: text.trim(),
      userId: session.user.sub,
      name: session.user.name,
      picture: session.user.picture,
      votes: 0,
      voters: [],
      createdAt: new Date(),
    };

    await collection.insertOne(suggestion);
    return new NextResponse(null, { status: 201 });
  } catch (error) {
    console.error("Error creating suggestion:", error);
    return new NextResponse(null, { status: 500 });
  }
}
