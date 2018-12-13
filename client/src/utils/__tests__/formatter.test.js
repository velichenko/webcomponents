import {addZero, formattedDate, pluralize} from '../formatter';

describe('utils', () => {
    describe('formatter', () => {
        describe('addZero', () => {
            it('should return with zero', () => {
                expect(addZero(0)).toBe('00');
                expect(addZero(1)).toBe('01');
            });

            it('should return equal', () => {
                expect(addZero('00')).toBe('00');
            })
        });

        describe('formattedDate', () => {
            it('should return date', () => {
                expect(formattedDate(1544715785502)).toBe('04.11.2018');
            });

            it('should return date', () => {
                expect(formattedDate(1544715785502, '/')).toBe('04/11/2018');
            });
        });

        describe('pluralize', () => {
            const words = ['one', 'two', 'five'];

            it('should return for one', () => {
                expect(pluralize(1, words)).toBe(words[0]);
            });

            it('should return for two', () => {
                expect(pluralize(2, words)).toBe(words[1]);
            });

            it('should return for five', () => {
                expect(pluralize(5, words)).toBe(words[2]);
            });

            it('should return default', () => {
                expect(pluralize(185, words)).toBe(words[2]);
            });

            it('should work with abs', () => {
                expect(pluralize(-5, words)).toBe(words[2]);
            });
        });
    });
});
