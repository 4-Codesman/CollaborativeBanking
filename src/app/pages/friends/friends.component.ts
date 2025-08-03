import { Component,inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './friends.html',
  styleUrl: './friends.css'
})

export class FriendsComponent {
  private auth: Auth = inject(Auth);
  private dataService: DataService = inject(DataService);

  //mock data and click handlers
  /*
  friendRequests = [
    { name: 'Lebo M' },
    { name: 'Thabo K' }
  ];

  friendsList = [
    { name: 'Zayd Bhai' },
    { name: 'Bradley C' },
    { name: 'Cameron D' }
  ];

  pairFriend = { name: 'Zayd Bhai' };
  pairProgress = 72;

  leaderboard = [
    { name: 'Sipho M', personalGoalProgress: 95 },
    { name: 'Zayd Bhai', personalGoalProgress: 80 },
    { name: 'Cameron D', personalGoalProgress: 60 }
  ];

  friendCode: string = '';

  addFriendByCode() {
    console.log('Adding friend by code:', this.friendCode);
  }

  acceptRequest(req: any) {
    console.log('Accepting request from:', req.name);
  }

  rejectRequest(req: any) {
    console.log('Rejecting request from:', req.name);
  }

  removeFriend(friend: any) {
    console.log('Removing friend:', friend.name);
  } */


  //variables:
  currentUID: string = ''; 
  friendRequests: any[] = [];
  friendsList: any[] = [];
  leaderboard: any[] = [];
  friendCode: string = '';

  pairFriend: any = null;
  pairProgress: number = 0;


  //fetching initial data
  ngOnInit(): void {
    const uid = this.auth.currentUser?.uid;

    if (uid) {
      this.currentUID = uid; // Store current user ID

      this.fetchFriendRequests();
      this.fetchFriendsList();

      // Fetch friend requests
      this.dataService.getFriendRequests(uid).subscribe({
        next: (requests) => {
          this.friendRequests = requests;
        },
        error: (err) => {
          console.error('Failed to fetch friend requests:', err);
        }
      });

      // Fetch confirmed friends
      this.dataService.getFriendsList(uid).subscribe({
        next: (friends) => {
          this.friendsList = friends;

          // Optional: generate leaderboard based on personalGoalProgress
          this.leaderboard = [...friends]
            .sort((a, b) => (b.personalGoalProgress || 0) - (a.personalGoalProgress || 0));
        },
        error: (err) => {
          console.error('Failed to fetch friends list:', err);
        }
      });

      // Fetch Pair friend
      this.dataService.getPairFriend(uid).subscribe({
        next: (data) => {
          this.pairFriend = data?.friend || null;
          this.pairProgress = data?.progress || 0;
        },
        error: (err) => {
          console.error('Failed to fetch pair friend:', err);
        }
      });

    } else {
      console.warn('User not authenticated yet.');
    }
  }

  //UI show list variables
  showFriendList = false;
  showFriendRequests = false;
  showTeamMembersList = false;
  showAddFriend = false;


  //click handlers
  addFriendByCode() { //add friend by code
    const uid = this.auth.currentUser?.uid;
    if (!this.friendCode || !uid) {
      alert('Please enter a valid friend code');
      return;
    }

    this.dataService.addFriend(this.friendCode, uid).subscribe({
      next: (res) => {
        console.log('✅ Friend request sent:', res);
        alert('Friend request sent!');
        this.friendCode = ''; // ✅ Clear input box
        this.fetchFriendRequests();   // refresh both
        this.fetchFriendsList();
      },
      error: (err) => {
        console.error('❌ Failed to send friend request:', err);
        alert('Failed to send friend request. Make sure the code is correct or try again later.');
      }
    });
  }

  acceptRequest(req: any) {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return;

    this.dataService.respondToRequest(uid, req.uid, true).subscribe({
      next: () => {
        console.log('✅ Friend request accepted:', req.name);
        this.friendRequests = this.friendRequests.filter(r => r.uid !== req.uid);
        this.fetchFriendRequests();   // refresh both
        this.fetchFriendsList();
      },
      error: (err) => {
        console.error('❌ Error accepting request:', err);
      }
    });
 }

  rejectRequest(req: any) {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return;

    this.dataService.respondToRequest(uid, req.uid, false).subscribe({
      next: () => {
        console.log('❌ Friend request rejected:', req.name);
        this.friendRequests = this.friendRequests.filter(r => r.uid !== req.uid);
        this.fetchFriendRequests();   // refresh both
        this.fetchFriendsList();
      },
      error: (err) => {
        console.error('❌ Error rejecting request:', err);
      }
    });
  }

  removeFriend(friend: any) {
    const uid = this.auth.currentUser?.uid;
    if (!uid) return;

    this.dataService.removeFriend(uid, friend.uid).subscribe({
      next: () => {
        console.log('🗑️ Removed friend:', friend.name);
        this.friendsList = this.friendsList.filter(f => f.uid !== friend.uid);
        this.fetchFriendRequests();   // refresh both
        this.fetchFriendsList();
      },
      error: (err) => {
        console.error('❌ Error removing friend:', err);
      }
    });
  }

  fetchFriendRequests() {
    this.dataService.getFriendRequests(this.currentUID).subscribe({
      next: (requests) => this.friendRequests = requests,
      error: (err) => console.error('Failed to refresh friend requests:', err)
    });
  }

  fetchFriendsList() {
    this.dataService.getFriendsList(this.currentUID).subscribe({
      next: (friends) => {
        this.friendsList = friends;
        this.leaderboard = [...friends].sort((a, b) => (b.personalGoalProgress || 0) - (a.personalGoalProgress || 0));
      },
      error: (err) => console.error('Failed to refresh friends list:', err)
    });
  }



}

