import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import HotelModel, { HotelType } from "../model/hotel.model";

export const createHotels = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ".base64" + b64;
      const response = await cloudinary.uploader.upload(dataURI);

      return response.url;
    });

    const imageURL = await Promise.all(uploadPromises);
    newHotel.imageUrls = imageURL;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new HotelModel(newHotel);

    await hotel.save();

    res.status(201).json({ status: "OK", hotel });
  } catch (error) {
    console.log("Error Creating Hotels", error);
    return res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
};
