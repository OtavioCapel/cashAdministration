import { TimestampDatePipe } from './timestampDate.pipe';

describe('TimestampDate', () => {
  it('create an instance', () => {
    const pipe = new TimestampDatePipe();
    expect(pipe).toBeTruthy();
  });
});
