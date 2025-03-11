import { createDefaultEsmPreset, type JestConfigWithTsJest } from "ts-jest";

const presetConfig = createDefaultEsmPreset({});

const jestConfig: JestConfigWithTsJest = {
  ...presetConfig,
};

export default jestConfig;
