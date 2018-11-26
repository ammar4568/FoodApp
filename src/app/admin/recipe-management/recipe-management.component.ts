import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../customer/recipe.service';
import { map } from 'rxjs/operators';
import { OrderService } from 'src/app/customer/order.service';

@Component({
  selector: 'app-recipe-management',
  templateUrl: './recipe-management.component.html',
  styleUrls: ['./recipe-management.component.css']
})
export class RecipeManagementComponent implements OnInit {

  recipes;
  constructor(private recipeService: RecipeService,
    private orderService: OrderService) {
    this.recipes = this.recipeService.getRecipes().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  ngOnInit() {
  }

  delete(recipeId) {
    this.orderService.getOrderId(recipeId).subscribe(item => {
      item.map(i => {
        const orderId = i.payload.doc.id;
        this.recipeService.deleteRecipe(recipeId)
          .then(() => {
            this.orderService.deleteOrder(orderId)
              .then(() => {
                // console.log('Successfully Deleted');
              })
              .catch(() => {
                // console.log('Cannot Delete');
              });
          });
      });
    });
  }
}
