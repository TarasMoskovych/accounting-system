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

  getCategories(): Observable<Array<Category>> {
    return this.get(null, { url: this.categoriesUrl });
  }

  checkCategories(category: string): Observable<any> {
    const url = `${this.categoriesUrl}/?name=${category}`;
    return this.get(null, { url }).pipe(map((data: Array<Category>) => data[0]) || null);
  }
}
