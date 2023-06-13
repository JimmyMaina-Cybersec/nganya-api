import { Module, forwardRef } from '@nestjs/common';
import { PresenceGateway } from './presence.gateway';
import { PresenceService } from './presence.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Presence, PresenceSchema } from './entities/presence.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Presence.name, schema: PresenceSchema },
    ]),
    forwardRef(() => PresenceModule)
  ],
  providers: [PresenceGateway, PresenceService],
})
export class PresenceModule {}
