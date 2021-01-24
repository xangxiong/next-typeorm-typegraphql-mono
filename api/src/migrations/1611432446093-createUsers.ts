import {MigrationInterface, QueryRunner} from "typeorm";
import { User } from '../entities/user.entity';

export class createUsers1611432446093 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userRepo = queryRunner.connection.getRepository(User);

        let user1 = new User();
        user1.name = 'Test User 1';
        user1.email = 'test1@localhost';
        user1.emailVerified = new Date();
        user1 = await userRepo.save(user1, {
            transaction: false
        });

        let user2 = new User();
        user2.name = 'Test User 2';
        user2.email = 'test2@localhost';
        user2.emailVerified = new Date();
        user2 = await userRepo.save(user2, {
            transaction: false
        });

        let user3 = new User();
        user3.name = 'Test User 3';
        user3.email = 'test3@localhost';
        user3.emailVerified = new Date();
        user3 = await userRepo.save(user3, {
            transaction: false
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
