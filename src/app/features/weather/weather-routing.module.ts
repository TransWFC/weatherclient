import { RouterModule, Routes } from "@angular/router";
import { ForecastComponent } from "./forecast/forecast.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "src/app/core/guards/auth.guard";

const routes: Routes = [
  { path: '', component: ForecastComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule {}