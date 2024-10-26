import { Image, IImage } from "../models/Image";

export const imageRepository = {
  saveImages: async (images: any): Promise<IImage[]> => {
    return (await Image.insertMany(images)).map((image) => image.toObject() as IImage); 
  },
  findMaxOrderByUserId: async (userId: string): Promise<IImage | null> => {
    return await Image.findOne({ userId }).sort({ order: -1 });
  },

  findImagesByUserId: async (userId: string): Promise<IImage[]> => {
    return Image.find({ userId }).sort({ order: 1 }).lean<IImage[]>().exec(); 
  },

  removeImage: async (imageId: string): Promise<void> => {
    await Image.findByIdAndDelete(imageId).exec();
  },

  updateImageOrder: async (images: IImage[]): Promise<void> => {
    for (const image of images) {
      await Image.findByIdAndUpdate(image._id, { order: image.order }).exec();
    }
  },
  updateImagesOrder: async (images: IImage[]): Promise<void> => {
    const bulkOps = images.map((image) => ({
      updateOne: {
        filter: { _id: image._id },
        update: { $set: { order: image.order } },
      },
    }));
    
    await Image.bulkWrite(bulkOps);
  },
  editImageTitleById: async (id: string, newTitle: string): Promise<void> => {
    await Image.findByIdAndUpdate(id, { title: newTitle }, { new: true });
  },
};
