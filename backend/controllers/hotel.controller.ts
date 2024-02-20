import { Request, Response } from "express";
import HotelModel from "../model/hotel.model";
import { constructSearchQuery } from "../utils/helper";

export const getHotels = async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);

    let sortOptions = {};
    switch (req.query.sortOptions) {
      case "starRating":
        sortOptions = { starRating: -1 };
        break;
      case "pricePerNightAsc":
        sortOptions = { pricePerNight: 1 };
        break;
      case "pricePerNightDesc":
        sortOptions = { pricePerNight: -1 };
        break;
      case "default":
        sortOptions = { lastUpdated: -1 };
    }

    const limit = 5;
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : "1"
    );
    const skip = (pageNumber - 1) * limit;

    const hotels = await HotelModel.find(query)
      .limit(limit)
      .skip(skip)
      .sort(sortOptions);

    const total = await HotelModel.countDocuments(query);

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
    console.log(error);
    res.status(500).json("internal server error");
  }
};
