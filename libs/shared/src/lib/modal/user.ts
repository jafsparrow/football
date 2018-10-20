export interface Roles {
    subscriber?: boolean;
    editor?: boolean;
    admin?: boolean;
 }

export interface User {
    uid: string;
    email: string;
    roles?: Roles;
    permission: Permission;
    dispalyName?: string;
    phoneNumber?: string;
    photoUrl?: string;

}

export interface Permission {
  role?: string;
  clubId?: string;
  clubName: string;
}
