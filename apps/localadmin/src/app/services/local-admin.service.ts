import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '@football/shared';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalAdminService {
  user$: Observable<any>;

  constructor(
    private auth: AuthenticationService,
    private db: AngularFirestore
  ) {
    this.user$ = this.auth.user$;
  }

  isLocalAdmin(user) {
    if (!user) return false;
    if (user.localAdmin && user.localAdmin.isLocalAdmin) {
      return true;
    }
    return false;
  }

  getNewClubRequests(): any {
    return this.db
      .collection('requests', ref =>
        ref
          .where('requestType', '==', 'club')
          .where('status', '==', 'initiated')
      )
      .snapshotChanges()
      .pipe(
        map(res => {
          return res.map(item => {
            const data = item.payload.doc.data();
            const id = item.payload.doc.id;

            return { id, ...data };
          });
        })
      );
  }

  getReqestClubDetails(key): any {
    return this.db
      .collection('requests')
      .doc(key)
      .snapshotChanges()
      .pipe(
        map(res => {
          const data = res.payload.data();
          const id = res.payload.id;

          return { id, ...data };
        })
      );
  }

  private acceptClub(id) {
    return this.db
      .collection('requests')
      .doc(id)
      .update({ status: 'approved' });
  }

  approveClub(club) {
    const userId = club.requestedUser.uid;
    const clubId = club.id;
    return this.acceptClub(club.id)
      .then(() => {
        const localBodyCode = club.address.localBodyCode;
        const generatedCode = this.generateClubCode(localBodyCode);
        console.log('club code generated ' + generatedCode);
        // update the club data with the code.
        club['codeNumber'] = generatedCode;
        delete club['requestedUser'];
        delete club['status'];
        delete club['requestType'];
        delete club['id'];
        // update the club infor then update the user with permissions.
        return this.db.collection('clubs').add(club);
      })
      .then(res => {
        const newPermission = {
          club: club.name,
          clubId: clubId,
          role: 'admin'
        };

        const data = { permission: newPermission };
        console.log(data);
        return this.db
          .collection('users')
          .doc(userId)
          .update({ permission: newPermission });
      })
      .then(() => {
        console.log(
          'updated clubs and the requested User has been assigned as the admin to the club.'
        );
        return Promise.resolve('success');
      });

    // add the club to clubs collection.
  }

  rejectClub(id) {
    return this.db
      .collection('requests')
      .doc(id)
      .update({ status: 'rejected' });
  }

  private generateClubCode(localBodyCode) {
    // get the localBody short code.

    const rand = this.randomIntFromInterval(1000, 9999);
    const newClubId = localBodyCode + rand.toString();
    return newClubId;
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  //  this is not added in now. will have to think about a way to wait till async function finishes.
  // private async checkIfClubCodeExits(code) {
  //   //  if the code exists, if it returns true.
  //   return await this.db
  //     .collection('clubs', ref => ref.where('codeNumber', '==', code))
  //     .valueChanges()
  //     .pipe(take(1))
  //     .subscribe(res => {
  //       if (res.length > 0) {
  //         return false;
  //       }
  //       return true;
  //     });
  // }
}
