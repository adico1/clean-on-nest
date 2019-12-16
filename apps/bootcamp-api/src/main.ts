/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { configService } from './config/config.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AccountsModule } from './accounts/accounts.module';

import * as passport from 'passport';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app, { fallbackOnErrors: true });
  app.enableCors();
  
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(passport.initialize());
  
  if (!configService.isProduction()) {

    // ╔═╗╦ ╦╔═╗╔═╗╔═╗╔═╗╦═╗
    // ╚═╗║║║╠═╣║ ╦║ ╦║╣ ╠╦╝
    // ╚═╝╚╩╝╩ ╩╚═╝╚═╝╚═╝╩╚═
    const options = new DocumentBuilder()
      .setTitle('Ninja Coder Bootcamp API')
      .setDescription('API Ninja Coder Bootcamp')
      .setVersion('1.0')
      .addTag('API')
      .build();

      const document = SwaggerModule.createDocument(app, options, {
        include: [
          AccountsModule,
        ],
      });

    SwaggerModule.setup('api', app, document);
  }

  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
    