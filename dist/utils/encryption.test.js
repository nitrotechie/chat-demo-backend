"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const encryption_1 = require("./encryption");
describe('Encryption Service', () => {
    it('should encrypt and decrypt a message correctly', () => {
        const message = 'Hello, ShareHive!';
        const encrypted = (0, encryption_1.encrypt)(message);
        expect(encrypted).not.toBe(message);
        const decrypted = (0, encryption_1.decrypt)(encrypted);
        expect(decrypted).toBe(message);
    });
});
