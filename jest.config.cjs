module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
		'\\.(css|sass|scss)$': 'identity-obj-proxy',
		'\\.(gif|tiff|eot|svg|png)$': '<rootDirs>/.jest/mocks/fileMock.js',
	},
	transform: {
		'^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
	},
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

