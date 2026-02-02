import { Test } from '@nestjs/testing';
import { NumbersService } from './numbers.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('NumbersService', () => {
  let numbersService: NumbersService;

  const eventEmitterMock: { emit: jest.Mock } = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module = await Test.createTestingModule({
      providers: [
        NumbersService,
        { provide: EventEmitter2, useValue: eventEmitterMock },
      ],
    }).compile();

    numbersService = module.get<NumbersService>(NumbersService);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(numbersService).toBeDefined();
  });
});
