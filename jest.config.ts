import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },

    moduleNameMapper: {
        '\\.module\\.css$': 'identity-obj-proxy',
    },
}

export default config
