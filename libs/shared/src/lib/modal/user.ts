export interface Roles {
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
 }

export interface User {
    uid: string;
    email: string;
    roles?: Roles;
    dispalyName?: string;
    phoneNumber?: string;
    photoUrl?: string;

}
