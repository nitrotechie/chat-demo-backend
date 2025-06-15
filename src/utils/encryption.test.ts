import { encrypt, decrypt } from './encryption';

describe('Encryption Service', () => {
    it('should encrypt and decrypt a message correctly', () => {
        const message = 'Hello, ShareHive!';
        const encrypted = encrypt(message);
        expect(encrypted).not.toBe(message);
        const decrypted = decrypt(encrypted);
        expect(decrypted).toBe(message);
    });
});
