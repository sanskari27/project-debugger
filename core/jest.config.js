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
    ],
    // Add timeout and force exit options to prevent hanging
    testTimeout: 10000,
    forceExit: true,
    // Clear mocks between tests
    clearMocks: true,
    // Reset modules between tests
    resetModules: true,
    // Restore mocks between tests
    restoreMocks: true
}; 