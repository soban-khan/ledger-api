import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ResponseFormat() {
  return applyDecorators(
    ApiResponse({
      status: '5XX',
      description: 'Server failed to process request',
      schema: {
        example: {
          isSuccess: false,
          error: 'error_message (server failed to process request)',
          data: {},
        },
      },
    }),
    ApiResponse({
      status: '4XX',
      description: 'Issue from client end',
      schema: {
        example: {
          isSuccess: false,
          error: 'error_message (issue from client end)',
          data: {},
        },
      },
    }),
  );
}
