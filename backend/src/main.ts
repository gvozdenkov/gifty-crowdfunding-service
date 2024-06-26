import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import YAML from 'js-yaml';
import fs from 'fs';
import { AppModule } from './app.module';

var bootstrap = () => {
  NestFactory.create(AppModule).then((app) => {
    var configService = app.get(ConfigService);
    var PORT = configService.get('PORT');

    app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

    var globalPrefix = 'api';

    app.setGlobalPrefix(globalPrefix);
    app.enableVersioning({
      type: VersioningType.URI,
    });
    app.enableCors();

    // for DTO every property is excluded by default unless you mark it as exposed
    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector), {
        strategy: 'excludeAll',
        excludeExtraneousValues: true,
      }),
    );

    var openApiSpec = YAML.load(fs.readFileSync('docs/openapi.yaml', 'utf-8'));

    SwaggerModule.setup(`${globalPrefix}/v1/docs`, app, openApiSpec);

    // eslint-disable-next-line no-console
    app.listen(PORT, () => console.log(`Server running on port ${PORT}, http://localhost:${PORT}`));
  });
};

bootstrap();
