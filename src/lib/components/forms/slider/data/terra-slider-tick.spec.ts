import { TerraSliderTick } from './terra-slider-tick';

describe('TerraSliderTick', () => {
    const slider: TerraSliderTick = new TerraSliderTick(1, 1);

    it('should create an instance', () => {
        expect(slider).toBeTruthy();
    });
    it('should be constructed with a value for `caption` and for `position`', () => {
        expect(slider.caption).toBe(1);
        expect(slider.position).toBe(1);
    });
});
