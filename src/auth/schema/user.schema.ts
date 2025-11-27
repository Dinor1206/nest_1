
import { AllowNull, Column, Model, Table } from "sequelize-typescript";

@Table ({timestamps:true,modelName:"Auth"})
export class User extends Model {
@Column
username:string

@Column
email:string

@Column
password:string

@Column({allowNull:true,defaultValue:null})
otp:string

@Column({defaultValue:false})
isVerify:boolean

@Column({allowNull:true, defaultValue:null})
otpTime:number
}