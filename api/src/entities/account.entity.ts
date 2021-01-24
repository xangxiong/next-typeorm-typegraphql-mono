import { Entity, BaseEntity, Column, OneToOne, JoinColumn, Index, BeforeUpdate, BeforeInsert, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { encryptBcrypt, matchBcrypt } from '../utils';
import { User } from './user.entity';

@Entity({name: 'accounts'})
@ObjectType('Account')
export class Account extends BaseEntity {
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
    
    @OneToOne( /* istanbul ignore next */  type => User)
    @Field(type => User)
    @JoinColumn()
    user: User;

    @Column()
    @Field()
    providerType: string;

    @Index('accountProviderId')
    @Column()
    @Field()
    providerId: string;

    @Index('accountProviderAccountId')
    @Column()
    @Field()
    providerAccountId: string;

    @Column()
    @Field()
    refreshToken: string;

    @Column()
    @Field()
    accessToken: string;

    @Column({nullable: true})
    @Field()
    accessTokenExpires: Date;

    @Column({
        type: 'varchar',
        length: 256,
        nullable: true
    })
    @Field()
    protected password: string;

    public setPassword(password: string): void {
        this.password = this.encryptPassword(password);
    }

    public hasPassword(): boolean {
        return !!this.password;
    }

    public encryptPassword(password: string): string {
        return encryptBcrypt(password);
    }

    public matchPassword(password: string): boolean {
        return matchBcrypt(password, this.password);
    }
}
