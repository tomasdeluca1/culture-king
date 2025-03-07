import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new NextResponse(null, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);
    const collection = db.collection("suggestions");

    const suggestion = await collection.findOne({
      _id: new ObjectId(params.id),
    });

    if (!suggestion) {
      return new NextResponse(null, { status: 404 });
    }

    // Check if user has already voted
    if (suggestion.voters.includes(session.user.sub)) {
      // Remove vote
      await collection.updateOne(
        { _id: new ObjectId(params.id) },
        {
          $inc: { votes: -1 },
          $pull: { voters: session.user.sub },
        }
      );
    } else {
      // Add vote
      await collection.updateOne(
        { _id: new ObjectId(params.id) },
        {
          $inc: { votes: 1 },
          $push: { voters: session.user.sub },
        }
      );
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error voting on suggestion:", error);
    return new NextResponse(null, { status: 500 });
  }
}
