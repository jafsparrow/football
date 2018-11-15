import { Injectable } from '@angular/core';
import { User } from '../modal/user';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor() {}

  canEditContent(content, user): boolean {
    if (!this.checkUserAuthorization(user, ['admin', 'editor'])) return false;
    if (!this.checkContentAuthorization(content, user)) return false;

    const contentStatus: string = content.status;

    if (contentStatus.toLowerCase() !== 'draft') return false;

    return true;
  }

  canPublishContent(content, user): boolean {
    if (!this.checkUserAuthorization(user, ['admin'])) return false;
    if (!this.checkContentAuthorization(content, user)) return false;

    const contentStatus: string = content.status;

    if (contentStatus.toLowerCase() !== 'submitted') return false;
    return true;
  }

  canSubmitContent(content, user): boolean {
    if (!this.checkUserAuthorization(user, ['admin', 'editor'])) return false;
    if (!this.checkContentAuthorization(content, user)) return false;

    const contentStatus: string = content.status;

    if (contentStatus.toLowerCase() !== 'draft') return false;
    return true;
  }
  canDeleteContent(content, user): boolean {
    if (!this.checkUserAuthorization(user, ['admin'])) return false;
    if (!this.checkContentAuthorization(content, user)) return false;
    return true;
  }

  private checkUserAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.permission && user.permission.role === role) {
        return true;
      }
    }
    return false;
  }

  private checkContentAuthorization(content: any | any, user) {
    const contentMainClubId = content.mainClub.id;
    const contentAuthorId = content.author.uid;
    const userPermittedClubId = user.permission.clubId;
    const userRole = user.permission.role;
    const userID = user.uid;

    if (contentMainClubId === userPermittedClubId) {
      if (userRole === 'admin') return true;
      if (userRole === 'editor' && contentAuthorId === userID) return true;
    }

    return false;
  }
}
