import { BadRequestFilter } from '../common/filters/bad-request.filter';
import { ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';

describe('BadRequestFilter', () => {
  it('should catch a BadRequestException and return a proper response', () => {
    const filter = new BadRequestFilter();

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    const mockResponse = { status: mockStatus } as unknown as Response;
    const mockRequest = {} as Request;

    const mockGetResponse = jest.fn().mockReturnValue(mockResponse);
    const mockGetRequest = jest.fn().mockReturnValue(mockRequest);
    const mockSwitchToHttp = jest.fn().mockReturnValue({
      getResponse: mockGetResponse,
      getRequest: mockGetRequest,
    });

    const mockHost = {
      switchToHttp: mockSwitchToHttp,
    } as unknown as ArgumentsHost;

    const exception = {
      getStatus: () => 400,
      getResponse: () => ({
        message: ['field must be a string'],
        error: 'Bad Request',
      }),
    };

    filter.catch(exception as any, mockHost);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      statusCode: 400,
      message: {
        message: ['field must be a string'],
        error: 'Bad Request',
      },
    });
  });
});