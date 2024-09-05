const { codegen: generateService } = require("swagger-axios-codegen");

generateService({
  methodNameMode: "operationId",
  remoteUrl: "http://localhost:4000/docs-json",
  outputDir: "./services",
  strictNullChecks: true,
  useCustomerRequestInstance: true,
  modelMode: "interface",
  extendDefinitionFile: "./services/customerDefinition.ts",
  extendGenericType: ["JsonResult"],
  sharedServiceOptions: true,
  useStaticMethod: true,
  openApi: "3.0.0"
}).then(() => {
  // eslint-disable-next-line no-console
  console.log("OK");
});
