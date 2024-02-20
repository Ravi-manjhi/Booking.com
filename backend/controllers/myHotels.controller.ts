import { Request, Response } from "express";
import HotelModel, { HotelType } from "../model/hotel.model";
import { uploadImages } from "../utils/helper";

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

    const limit = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * limit;
    const sort = req.query.sort ? (req.query.sort as string) : "-lastUpdated";

    const hotels = await HotelModel.find({ userId })
      .skip(skip)
      .limit(limit)
      .sort(sort);

    const total = await HotelModel.countDocuments();

    if (!hotels) {
      return res.status(404).json({ message: "Not found" });
    }

    const response = {
      data: hotels,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / limit),
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getMyHotelById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const hotel = await HotelModel.findById(id);

    if (!hotel) {
      return res.status(400).json({ message: "bad Request" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatedHotel = async (req: Request, res: Response) => {
  try {
    const updateHotel: HotelType = req.body;
    updateHotel.lastUpdated = new Date();

    const hotel = await HotelModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      updateHotel
    );

    if (!hotel) {
      return res.status(404).json({ message: "bad Request" });
    }

    const files = req.files as Express.Multer.File[];
    const imageUrls = await uploadImages(files);

    hotel.imageUrls = [...imageUrls, ...(updateHotel.imageUrls || [])];

    await hotel.save();

    res.status(200).json({ message: "Update Hotel details", hotel });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
