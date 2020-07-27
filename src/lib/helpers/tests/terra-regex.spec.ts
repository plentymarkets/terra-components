import { TerraRegex } from '..';

describe('TerraRegex: COLOR_HEX', () =>
{
    const regEx:RegExp = new RegExp(TerraRegex.COLOR_HEX);

    it('should match uppercase and lowercase hexadecimal patterns', () =>
    {
        expect(regEx.test('#FF33CC')).toBe(true);
        expect(regEx.test('#ff33cc')).toBe(true);
        expect(regEx.test('#123456')).toBe(true);
    });

    it('should match a pattern with 3 tokens', () =>
    {
        expect(regEx.test('#F3C')).toBe(true);
        expect(regEx.test('#123')).toBe(true);
    });

    it('must not match patterns with invalid hexadecimal color', () =>
    {
        expect(regEx.test('#FG33CC')).toBe(false);
        expect(regEx.test('#F33CC')).toBe(false);
        expect(regEx.test('FF33CC')).toBe(false);
    });
});

describe('TerraRegex: NUMERIC', () =>
{
    const regEx:RegExp = new RegExp(TerraRegex.NUMERIC);

    it('should match different numeric values', () =>
    {
        expect(regEx.test('0')).toBe(true);
        expect(regEx.test('-3')).toBe(true);
        expect(regEx.test('3')).toBe(true);
        expect(regEx.test('123456')).toBe(true);
    });

    it('should match values with exponent', () =>
    {
        expect(regEx.test('3e30')).toBe(false);
    });

    it('must not match rational numeric values', () =>
    {
        expect(regEx.test('3.4')).toBe(false);
        expect(regEx.test('3,4')).toBe(false);
    });
});

describe('TerraRegex: EMAIL', () =>
{
    const regEx:RegExp = new RegExp(TerraRegex.EMAIL);

    it('should match email addresses with or without different valid special characters', () =>
    {
        expect(regEx.test('user123@domain.com')).toBe(true);
        expect(regEx.test('123username@domain.com')).toBe(true);
        expect(regEx.test('user@domain123.com')).toBe(true);
        expect(regEx.test('user@domain.co.uk')).toBe(true);
        expect(regEx.test('user+name@domain.com')).toBe(true);
        expect(regEx.test('user-name@domain.de')).toBe(true);
        expect(regEx.test('user=name@domain.de')).toBe(true);
        expect(regEx.test('user.name@domain.com')).toBe(true);
        expect(regEx.test('user.name@my-domain.com')).toBe(true);
        expect(regEx.test('user_name@my-domain.com')).toBe(true);
    });

    it('must not match e-mail addresses with different invalid special characters', () =>
    {
        expect(regEx.test('user,name@domain.com')).toBe(false);
        expect(regEx.test('user..name@mydomain.com')).toBe(false);
    });
});

describe('TerraRegex: URL', () =>
{
    const regEx:RegExp = new RegExp(TerraRegex.URL);

    it('should match regular urls', () =>
    {
        expect(regEx.test('http://domain.com')).toBe(true);
        expect(regEx.test('http://www.domain.com')).toBe(true);
        expect(regEx.test('http://www.domain.co.uk')).toBe(true);
        expect(regEx.test('https://www.test-domain.com')).toBe(true);
        expect(regEx.test('https://www.test-domain.com/subpage')).toBe(true);
        expect(regEx.test('https://www.test-domain.com/subpage/test.html')).toBe(true);
        expect(regEx.test('ftp://www.test-ftp-server.com')).toBe(true);
    });

    it('must not match urls with invalid protocol pattern', () =>
    {
        expect(regEx.test('http:/domain.com')).toBe(false);
        expect(regEx.test('https//www.domain.com')).toBe(false);
    });
});
