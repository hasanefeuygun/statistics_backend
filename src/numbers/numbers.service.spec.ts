import { Test } from '@nestjs/testing';
import { NumbersService } from './numbers.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('NumbersService', () => {
  let numbersService: NumbersService;

  const eventEmitterMock: {
    emit: jest.MockedFunction<(event: string, payload: number) => void>;
  } = {
    emit: jest.fn() as jest.MockedFunction<
      (event: string, payload: number) => void
    >,
  };

  beforeEach(async () => {
    jest.clearAllMocks(); // clean mock history for other tests not being effected

    const module = await Test.createTestingModule({
      providers: [
        NumbersService,
        { provide: EventEmitter2, useValue: eventEmitterMock }, // making eventemitter a mock function to only test number.service behaviour with appropriate values
      ],
    }).compile();

    numbersService = module.get<NumbersService>(NumbersService);
  });

  afterEach(() => {
    jest.useRealTimers(); // Clean up after each test
    jest.restoreAllMocks();
    numbersService.stopForClient();
  });

  it('should be defined', () => {
    expect(numbersService).toBeDefined(); // Is service mounted properly?
  });

  it('startForClient should increase subscriberCount', () => {
    expect(numbersService.getSubscriberCount()).toBe(0);

    numbersService.startForClient();
    expect(numbersService.getSubscriberCount()).toBe(1);
  });

  it('should emit numbersService.tick every 5 seconds when the subscriber count is greater than 0', () => {
    jest.useFakeTimers();

    jest.spyOn(Math, 'random').mockReturnValue(0); // Since we are checking for numbers.tick freuqency no need for real random value.This means when Math.random called our mockData will be 0 but we are making "value = Math.floor(Math.random() * 10) + 1" so result should be 1.

    jest.spyOn(Date, 'now').mockReturnValue(1234567890);

    numbersService.startForClient();

    jest.advanceTimersByTime(5000);

    expect(eventEmitterMock.emit).toHaveBeenCalled(); // after 5 seconds function should be called.

    const lastCall = eventEmitterMock.emit.mock.calls[ // ["numbers.tick",{value:1,at:1234567890}]
      eventEmitterMock.emit.mock.calls.length - 1
    ] as [string, number];

    expect(lastCall?.[0]).toBe('numbers.tick');

    expect(lastCall?.[1]).toEqual({ value: 1, at: 1234567890 });

    jest.advanceTimersByTime(15000);

    const tickCalls = (eventEmitterMock.emit as jest.Mock).mock.calls.filter(
      ([eventName]) => eventName === 'numbers.tick',
    );

    expect(tickCalls.length).toBe(4);
  });
});
