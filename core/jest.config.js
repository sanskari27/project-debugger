export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    testMatch: [
        '**/tests/**/*.ts',
        '**/tests/**/*.js',
        '**/?(*.)+(spec|test).ts',
        '**/?(*.)+(spec|test).js'
    ],
    transform: {
        '^.+\\.ts$': ['ts-jest', { useESM: true }],
    },
    collectCoverageFrom: [
        'src/**/*.ts',
        '!src/**/*.d.ts',
        '!src/**/*.test.ts',
        '!src/**/*.spec.ts',
        '!tests/**/*.ts',
        '!tests/**/*.js'
    ],
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    extensionsToTreatAsEsm: ['.ts'],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/dist/'
    ]
}; 