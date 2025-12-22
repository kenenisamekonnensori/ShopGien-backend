

export interface UserProps {
    id: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
};

export class User {
    readonly id: string;
    readonly email: string;
    readonly passwordHash: string;
    readonly createdAt: Date;

    constructor(props: UserProps) {
        this.id = props.id;
        this.email = props.email.toLocaleLowerCase();
        this.passwordHash = props.passwordHash;
        this.createdAt = props.createdAt;
    }
}