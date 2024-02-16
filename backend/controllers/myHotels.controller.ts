import { v2 as cloudinary } from "cloudinary";
import { Request, Response } from "express";
import HotelModel, { HotelType } from "../model/hotel.model";

async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export const createHotels = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    const imageUrls = await uploadImages(imageFiles);

    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new HotelModel(newHotel);
    await hotel.save();

    res.status(201).send(hotel);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMyHotelCtrl = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    const hotels = await HotelModel.find({ userId }).sort({ lastUpdated: -1 });
    if (!hotels) {
      return res.status(400).json({ message: "Bad Request" });
    }

    res.status(200).json(hotels);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
