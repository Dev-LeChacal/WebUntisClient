module.exports = {
    setupFiles: ["dotenv/config"],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testEnvironment: "node",
    silent: false,
};
