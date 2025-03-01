import { Injectable } from '@nestjs/common';
//==========================================

@Injectable()
export class ApiFeaturesService {
  constructor() {}

  filter(query: any, modelQuery: any) {
    const queryObj = { ...query };
    const excludedFields = ['sort', 'limit', 'page', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    );

    return modelQuery.find(JSON.parse(queryStr));
  }

  sort(query: any, modelQuery: any) {
    if (query.sort) {
      const sortBy = (query.sort as string).split(',').join(' ');
      return modelQuery.sort(sortBy);
    }
    return modelQuery.sort('-createdAt'); // Default sorting
  }

  selectFields(query: any, modelQuery: any) {
    if (query.fields) {
      const fields = (query.fields as string).split(',').join(' ');
      return modelQuery.select(fields);
    }
    return modelQuery;
  }

  paginate(query: any, modelQuery: any) {
    const page = parseInt(query.page as string) || 1;
    const limit = parseInt(query.limit as string) || 10;
    const skip = (page - 1) * limit;

    return modelQuery.skip(skip).limit(limit);
  }
}
