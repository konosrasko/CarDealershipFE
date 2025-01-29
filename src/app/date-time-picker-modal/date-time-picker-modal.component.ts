import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
  private resrvationUrl = 'http://localhost:8080/api/reservation/test-drive';

  constructor(private http: HttpClient) {}

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

    this.http.post(this.resrvationUrl, reservation).subscribe({
      next: (response: any) => {
        alert('Your reservation is booked for: ' + this.selectedDate + ' at ' + this.selectedTime);
        console.log('Reservation successful:', response);
      },
      error: (error: any) => {
        console.error('Error while making a reservation:', error);
      }
    });

    this.closeCalendar();
  }
}
