import { dbConnect } from "@/lib/utils/dbConnect";
import { User } from "@/lib/models/schema";
import { isValidObjectId } from "mongoose";

export const GET = async (
  req: Request,
  { params }: { params: { userId: string } },
) => {
  try {
    await dbConnect();
    const { userId } = params;
    if (!isValidObjectId(userId)) {
      return Response.json({ error: "유효하지 않은 Id 입니다." });
    }
    const user = await User.findOne({ _id: userId });
    return Response.json(user);
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { userId: string } },
) => {
  try {
    await dbConnect();
    const { userId } = params;
    const user = await User.findOneAndDelete({ _id: userId });
    return Response.json({ user });
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
};
