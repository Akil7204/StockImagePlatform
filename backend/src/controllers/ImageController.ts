import { Request, Response } from "express";
import { imageService } from "../services/ImageService";
import { imageRepository } from "../repositories/ImageRepository";

const imageSvc = imageService(imageRepository);

export const uploadImages = async (req: any, res: Response) => {
  try {
    const userId = req.userId;
    const images = req.files as Express.Multer.File[];
    const { titles } = req.body;

    const uploadedImages = await imageSvc.uploadImages(images, userId, titles);

    res.status(201).json(uploadedImages);
  } catch (error) {
    res.status(500).json({ error: "Image upload failed" });
  }
};

export const getImages = async (req: any, res: Response) => {
  try {
    const userId = req.userId;
    const images = await imageSvc.getUserImages(userId);
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: "Fetching images failed" });
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await imageSvc.deleteImage(id);
    res.status(200).json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ error: "Image deletion failed" });
  }
};

export const updateImageOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const images = req.body;
  
  try {
    await imageSvc.reorderImages(images);
    res.status(200).json({ message: "Image order updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update image order" });
  }
};

export const rearrangeImages = async (req: Request, res: Response) => {
  try {
    const images = req.body;
    await imageSvc.rearrangeImages(images);
    res.status(200).json({ message: "Images rearranged" });
  } catch (error) {
    res.status(500).json({ error: "Rearranging images failed" });
  }
};
