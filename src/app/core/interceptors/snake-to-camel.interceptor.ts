import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs';

function snakeToCamel(key: string): string {
  return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function convertToCamelCase<T = unknown>(data: unknown): T {
  if (Array.isArray(data)) {
    return data.map((item) => convertToCamelCase(item)) as unknown as T;
  }

  if (data !== null && typeof data === 'object') {
    const obj = data as Record<string, unknown>;
    const result: Record<string, unknown> = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[snakeToCamel(key)] = convertToCamelCase(obj[key]);
      }
    }

    return result as T;
  }

  return data as T;
}

export const snakeToCamelInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event) => {
      if (event instanceof HttpResponse) {
        return event.clone({
          body: convertToCamelCase(event.body),
        });
      }

      return event;
    })
  );
};
