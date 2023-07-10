import { Request, Response } from 'express';
import { Model } from 'mongoose';

type QueryFilter = { [field: string]: any };
type PopulateFields = string[];

export function Paginate() {
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
      const currentPage = Number(req.query.page) || 1;
      const responsePerPage = Number(req.query.resPerPage) || 20;
      const skip = (currentPage - 1) * responsePerPage;
      const limit = responsePerPage;

      try {
        const model = getModelFromMetadata(target, propertyKey);

        if (!model) {
          return res.status(500).json({ error: 'Model not found' });
        }

        let query = model.find();

        const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey);
        const filterConditions = extractFilterConditions(req, paramTypes, query);
        const populateFields = extractPopulateFields(req, paramTypes, query);

        if (filterConditions) {
          query = query.where(filterConditions);
        }

        const totalCount = await query.countDocuments();
        const totalPages = Math.ceil(totalCount / responsePerPage);

        let paginatedQuery = originalMethod.call(this, req, query);

        if (populateFields && populateFields.length > 0) {
          for (const field of populateFields) {
            paginatedQuery = paginatedQuery.populate(field);
          }
        }

        const data = await paginatedQuery.skip(skip).limit(limit).exec();

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

function getModelFromMetadata(target: Record<string, any>, propertyKey: string): Model<any> | undefined {
  const constructor = target.constructor;

  if (constructor && constructor.prototype) {
    const model = constructor.prototype[propertyKey];

    if (model instanceof Model) {
      return model;
    }
  }

  return undefined;
}

function extractFilterConditions(req: Request, paramTypes: any[], query: any): QueryFilter | undefined {

  const filterConditions: QueryFilter = {};

  for (let i = 0; i < paramTypes.length; i++) {
    const paramType = paramTypes[i];

    if (paramType === Object && query === req.query) {
      Object.entries(query).forEach(([key, value]) => {
        filterConditions[key] = value;
      });
    }
  }

  return Object.keys(filterConditions).length > 0 ? filterConditions : undefined;
}

function extractPopulateFields(req: Request, paramTypes: any[], query: any): PopulateFields | undefined {
  const populateFields: PopulateFields = [];

  for (let i = 0; i < paramTypes.length; i++) {
    const paramType = paramTypes[i];

    if (Array.isArray(paramType) && query === req.query && typeof req.query.populate === 'string') {
      const fields = req.query.populate.split(',');

      for (const field of fields) {
        populateFields.push(field.trim());
      }
    }
  }

  return populateFields.length > 0 ? populateFields : undefined;
}
