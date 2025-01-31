import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {DateTimePickerModalService} from './date-time-picker-modal.service';
import {SharedService} from '../shared/shared.service';

@Component({
  selector: 'app-date-time-picker-modal',
  templateUrl: './date-time-picker-modal.component.html',
  imports: [
    FormsModule,
    NgIf
  ],
  styleUrls: ['./date-time-picker-modal.component.css']
})
export class DateTimePickerModalComponent {
  @Output() close = new EventEmitter<void>();
  @Output() submitDateTime = new EventEmitter<{ date: string, time: string }>();
  @Input() carId: number | null = null;

  isCalendarOpen = true;
  selectedDate: string | null = null;
  selectedTime: string | null = null;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private dateTimePickerModalService: DateTimePickerModalService, private sharedService: SharedService) {}

  closeCalendar(): void {
    this.isCalendarOpen = false;
    this.close.emit(); // Notify the parent that the modal was closed
  }

  submit(): void {
    const reservation = {
      citizenId: localStorage.getItem('userID'),
      carId: this.carId,     // Replace with actual carId
      reservationDate: this.selectedDate,
      reservationTime: this.selectedTime
    };

    this.dateTimePickerModalService.createReservation(reservation).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = null;
        alert(this.successMessage);
        this.sharedService.requestRefresh();
      },
      error: (error) => {
        this.successMessage = null;
        this.errorMessage = error.message;
        alert(this.errorMessage);
      }
    });

    this.closeCalendar();
  }
}
