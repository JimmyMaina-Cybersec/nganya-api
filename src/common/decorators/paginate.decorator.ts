import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import PaginationQueryType from 'src/types/paginationQuery';

export const Pagination = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): PaginationQueryType => {
    const request = ctx.switchToHttp().getRequest();
    const page = parseInt(request.query.page, 10) || 1;
    const resPerPage = parseInt(request.query.resPerPage, 10) || 20;

    return {
      page,
      resPerPage,
      skip: (page - 1) * resPerPage,
    };
  },
);
