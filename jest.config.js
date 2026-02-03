import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

export const setupFiles = ['dotenv/config'];
export const testEnvironment = 'node';
export const transform = {
    ...tsJestTransformCfg,
};
export const silent = false;
