import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "User" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string 

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default:null})
  otp: number;

//   @Column({ default: UserRole.USER })
//   role: UserRole;

  @Column({ default: false})
  isVerify: boolean;

  @Column({ type: "bigint", nullable: true, default:0 })
  otpTime: number;

  @UpdateDateColumn({default:Date})
  updatedAt: Date;

  @CreateDateColumn({default:Date})
  createdAt: Date;
}
