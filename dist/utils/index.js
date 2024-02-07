"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLicenseNumber = void 0;
const generateLicenseNumber = () => {
    return 'RDL' + Math.random().toString(36).substr(2, 9);
};
exports.generateLicenseNumber = generateLicenseNumber;
