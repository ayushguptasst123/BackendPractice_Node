import { NestFactory } from '@nestjs/core';
import { PersonModule } from './person/person.module';

async function bootstrap() {
  const app = await NestFactory.create(PersonModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

/**
 * By default, NestJS only parses JSON (application/json), so raw text won’t be read unless we handle it.
 *
 * ``` js
 * import * as bodyParser from 'body-parser';
 *
 * app.use(bodyParser.text());
 * ```
 */
