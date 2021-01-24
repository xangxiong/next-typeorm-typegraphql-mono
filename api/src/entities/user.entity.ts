import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, BeforeUpdate, BeforeInsert } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';

@Entity({name: 'users'})
@ObjectType('User')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column({
        type: 'date',
        nullable: true
    })
    @Field()
    public createdAt: Date;

    @Column({
        type: 'date',
        nullable: true
    })
    @Field()
    public updatedAt: Date;

    @BeforeUpdate()
    public setUpdatedAt() {
        this.updatedAt = new Date();
    }

    @BeforeInsert()
    public updateDates() {
        const time = new Date();
        this.createdAt = time;
        this.updatedAt = time;
    }

    @Column()
    @Field()
    name: string;

    @Column({unique: true})
    @Field()
    email: string;

    @Column({type: 'date', nullable: true})
    @Field(type => Date)
    emailVerified: Date;
}