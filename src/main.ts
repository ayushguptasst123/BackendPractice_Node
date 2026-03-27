import { NestFactory } from '@nestjs/core';
import { PersonModule } from './person/person.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(PersonModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: {
        target: true,
        value: true,
      },
      exceptionFactory: (errors) => {
        return new BadRequestException({
          message: 'Validation Failed ',
          errors: errors.map((err) => {
            return {
              Error: Object.keys(err.constraints || {})[0],
              Desc: Object.values(err.constraints || {})[0],
            };
          }),
          totalError: errors.length,
        });
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

/** OTHER-TYPE
 * By default, NestJS only parses JSON (application/json), so raw text won’t be read unless we handle it.
 *
 * ``` js
 * import * as bodyParser from 'body-parser';
 *
 * app.use(bodyParser.text());
 * ```
 */

/** VALIDATION PIPES
 *  After writing the decorator, we have to tell the `main.ts` file to check the content;
 *  otherwise, it will not work.
 *
 * ```
 * app.useGlobalPipes(new ValidationPipes());
 * ```
 */
