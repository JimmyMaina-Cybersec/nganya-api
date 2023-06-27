import { Request, Response } from 'express';

export function Paginate(
  collection: any,
  filterConditions?: any,
  responsePerPage: number = 20,
  defaultPage: number = 1,
) {
  return function (
    target: Record<string, any>,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response
    ): Promise<any> {
      const currentPage = Number(req.query.page) || defaultPage;
      const skip = (currentPage - 1) * responsePerPage;
      const limit = responsePerPage;

      try {
        let query = collection.find();

        if (filterConditions) {
          query = query.where(filterConditions);
        }

        const totalCount = await collection.countDocuments().exec();
        const totalPages = Math.ceil(totalCount / responsePerPage);

        const paginatedQuery = originalMethod
          .call(this, skip, limit)
          .populate('vehicle')
          .populate('route');

        const data = await paginatedQuery.exec();

        res.json({
          data,
          currentPage,
          responsePerPage,
          totalPages,
        });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    };

    return descriptor;
  };
}
