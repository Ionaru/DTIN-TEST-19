import { shippingCosts } from './index';

describe('shippingCosts', () => {

    it('must have a cost of 0 when calculateShippingCosts is false', () => {
        expect.assertions(1);
        const result = shippingCosts(false, 'Ground', 300);
        expect(result).toBe(0);
    });

    it('must calculate the cost correctly for ground transport', () => {
        expect.assertions(1);
        const result = shippingCosts(true, 'Ground', 300);
        expect(result).toBe(100);
    });

    it('must calculate the cost correctly for in-store pickup', () => {
        expect.assertions(1);
        const result = shippingCosts(true, 'InStore', 300);
        expect(result).toBe(50);
    });

    it('must calculate the cost correctly for NextDayAir transport', () => {
        expect.assertions(1);
        const result = shippingCosts(true, 'NextDayAir', 300);
        expect(result).toBe(250);
    });

    it('must calculate the cost correctly for SecondDayAir transport', () => {
        expect.assertions(1);
        const result = shippingCosts(true, 'SecondDayAir', 300);
        expect(result).toBe(125);
    });

    it('must have a cost of 0 with an unknown transport method', () => {
        expect.assertions(1);
        const result = shippingCosts(true, 'HotAirBalloon', 300);
        expect(result).toBe(0);
    });

    it('must calculate the cost correctly when totalPrice is exactly than 1500', () => {
        expect.assertions(1);
        const result = shippingCosts(true, 'Ground', 1500);
        expect(result).toBe(100);
    });

    it('must have a cost of 0 when totalPrice is higher than 1500', () => {
        expect.assertions(1);
        const result = shippingCosts(true, 'Ground', 1501);
        expect(result).toBe(0);
    });

});
