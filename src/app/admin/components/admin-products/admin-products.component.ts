import { ProductService } from 'shared/services/product-service/product-service.service';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss'],
})
export class AdminProductsComponent implements OnDestroy {
  productsMap: any[];
  subscription: Subscription;
  displayedColumns: string[] = ['value.title', 'value.price', 'modify'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe((productsMap) => {
        this.productsMap = productsMap;
        this.initializeTable(productsMap);
      });
  }

  private initializeTable(products) {
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
      return this.getPropertyByPath(data, sortHeaderId);
    };
  }

  getPropertyByPath(obj: Object, pathString: string) {
    return pathString.split('.').reduce((o, i) => o[i], obj);
  }

  filter(query: string): void {
    const filteredProducts = query
      ? this.productsMap.filter((product) => {
          return product.value.title
            .toLowerCase()
            .includes(query.toLowerCase());
        })
      : this.productsMap;

    this.initializeTable(filteredProducts);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
