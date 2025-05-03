import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('financial-ledger')
  .setDescription(
    'A simple financial ledger API built with NestJS, TypeScript, and PostgreSQL, following double-entry accounting principles.',
  )
  .setVersion('1.0.0')
  //   .addBearerAuth()
  .build();

export const swaggerOptions = {
  swaggerOptions: { defaultModelsExpandDepth: -1 },
};
