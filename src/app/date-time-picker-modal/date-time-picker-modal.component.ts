import { Component, EventEmitter, Output } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

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

  isCalendarOpen = true;
  selectedDate: string | null = null;
  selectedTime: string | null = null;

  closeCalendar(): void {
    this.isCalendarOpen = false;
    this.close.emit(); // Notify the parent that the modal was closed
  }

  submit(): void {
    console.log("DATE:" + this.selectedDate + " TIME:" + this.selectedTime);
    this.closeCalendar(); // Close the modal after submitting
  }
}
