import imagekit from "@/configs/imageKit";
import { prisma } from "@/lib/prisma"; // Ensure this path matches your project setup
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Create the store
export async function POST(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the data from the form
    const formData = await request.formData();
    const name = formData.get("name");
    const username = formData.get("username");
    const description = formData.get("description");
    const email = formData.get("email");
    const contact = formData.get("contact");
    const address = formData.get("address");
    const image = formData.get("image");

    // Validate all fields are present
    if (
      !name ||
      !username ||
      !description ||
      !email ||
      !contact ||
      !address ||
      !image
    ) {
      return NextResponse.json(
        { error: "Missing store info" },
        { status: 400 },
      );
    }

    // Check if user already has a registered store
    const store = await prisma.store.findFirst({
      where: { userId: userId },
    });

    // If store is already registered, send its status
    if (store) {
      return NextResponse.json({ status: store.status }, { status: 200 });
    }

    // Check if username is already taken
    const isUsernameTaken = await prisma.store.findFirst({
      where: { username: username.toString().toLowerCase() },
    });

    if (isUsernameTaken) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 },
      );
    }

    // image upload to imagekit
    const buffer = Buffer.from(await image.arrayBuffer());
    const response = await imagekit.upload({
      file: buffer,
      fileName: image.name,
      folder: "logos",
    });

    const optimizedImage = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "512" },
      ],
    });

    const newstore = await prisma.store.create({
      data: {
        userId,
        name,
        description,
        username: username.toLowerCase(),
        email,
        contact,
        address,
        logo: optimizedImage,
      },
    });

    // Link store to user
    await prisma.user.update({
      where: { id: userId },
      data: { store: { connect: { id: newstore.id } } },
    });

    return NextResponse.json({ message: "applied, waiting for approval" });
  } catch (error) {
    console.error("[STORE_POST_ERROR]", error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 },
    );
  }
}

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    // Check if user already has a registered store
    const store = await prisma.store.findFirst({
      where: { userId: userId },
    });

    // If store is already registered, send its status
    if (store) {
      return NextResponse.json({ status: store.status }, { status: 200 });
    }

    return NextResponse.json({ status: "not registered" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.code || error.message },
      { status: 400 },
    );
  }
}
