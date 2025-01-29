import { Component, OnInit } from '@angular/core';
import { ReservationsService, Reservation } from './reservations.service';
import {MatCard} from '@angular/material/card';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  imports: [
    MatCard,
    NgForOf
  ],
  styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent implements OnInit {
  reservations: Reservation[] = [];
  citizenID = localStorage.getItem('userID');

  constructor(private reservationsService: ReservationsService) {}

  ngOnInit() {
    this.fetchReservations();
  }

  fetchReservations() {
    this.reservationsService.getReservations(<number><unknown>this.citizenID).subscribe({
      next: (data: Reservation[]) => (this.reservations = data),
      error: (err: any) => console.error('Error fetching reservations', err),
    });
  }
}
