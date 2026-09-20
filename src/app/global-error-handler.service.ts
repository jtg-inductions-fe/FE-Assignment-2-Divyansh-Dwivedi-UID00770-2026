import { ErrorHandler } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: unknown): void {
    console.error('Global runtime error:', error);
  }
}
