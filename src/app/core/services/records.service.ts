import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CoreModule } from '../core.module';
import { Category } from 'src/app/shared/models';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: CoreModule
})
export class RecordsService extends BaseHttpService {
  private categoriesUrl = 'categories';

  createCategory(category: Category): Observable<Category> {
    return this.post(null, category, { url: this.categoriesUrl });
  }

  updateCategory(category: Category): Observable<Category> {
    const url = `${this.categoriesUrl}/${category.id}`;
    return this.put(null, category, { url });
  }

  removeCategory(id: number): Observable<Category> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.delete(null, { url });
  }

  getCategoriesByUserId(id: number): Observable<Category[]> {
    const url = `${this.categoriesUrl}/?userId=${id}`;
    return this.get(null, { url });
  }

  getCategoryById(id: number): Observable<Category> {
    const url = `${this.categoriesUrl}/?id=${id}`;
    return this.get(null, { url }).pipe(map((data: Category[]) => data[0]) || null);
  }

  checkCategories(category: string, userId: number): Observable<Category> {
    const url = `${this.categoriesUrl}/?name=${category}&userId=${userId}`;
    return this.get(null, { url }).pipe(map((data: Category[]) => data[0]) || null);
  }
}
