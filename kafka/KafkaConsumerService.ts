import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private readonly kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
  });

  private readonly consumer: Consumer = this.kafka.consumer({ groupId: 'test-group' });

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'my-topic', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Received message from ${topic}:`, message.value.toString());
      },
    });
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}
