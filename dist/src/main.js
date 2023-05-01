"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const defaultValues_1 = require("./config/defaultValues");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const crossOriginList = process.env.NODE_ENV === 'production'
        ? process.env.CROSS_ORIGIN_LIST.split(',').map((origin) => origin.trim())
        : true;
    app.setGlobalPrefix('api/v1/bike');
    app.enableCors({ origin: crossOriginList });
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const PORT = process.env.PORT || defaultValues_1.DEFAULT_PORT;
    await app.listen(PORT, () => new common_1.Logger('bootstrap').log(`Application listening on port ${PORT}`));
}
bootstrap();
//# sourceMappingURL=main.js.map