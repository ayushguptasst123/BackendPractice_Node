import { NestFactory } from '@nestjs/core';
import { PersonModule } from './person/person.module';

async function bootstrap() {
  const app = await NestFactory.create(PersonModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );
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
